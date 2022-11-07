import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponseDto } from 'src/common/entities/dto/http-response.dto';
import { UserSignupDto } from 'src/common/entities/dto/user-signup.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Save a new user to the database
   *
   * @param user details for new user
   *
   * @returns newly created User{} object
   */
  async createUser(user: UserSignupDto): Promise<User> {
    try {
      Logger.debug('[AuthService] Saving new user to db...');
      const newUser = this.repo.save(user);
      return newUser;
    } catch (err) {
      Logger.error(`[AuthService] Could not save new user to db: ${err}`);
    }
  }

  /**
   * Used to confirm email address of a user
   *
   * @param email email address to be confirmed
   *
   * @returns result of update operation as UpdateResult{} or
   * HttpResponseDto{} if user has already confirmed their email address
   */
  async confirmEmail(email: string): Promise<UpdateResult | HttpResponseDto> {
    let result: UpdateResult;
    try {
      const user: User = await this.repo.findOneBy({ email });

      if (!user.emailConfirmed) {
        Logger.debug(`[AuthService] Confirming email address: ${email}`);
        try {
          result = await this.repo
            .createQueryBuilder()
            .update(User)
            .set({ emailConfirmed: true })
            .where({ email })
            .execute();
        } catch (err) {
          Logger.debug(`[AuthService] Could not confirm email address, ${err}`);
        }

        if (result != null) {
          return result;
        } else {
          const errorMessage: HttpResponseDto = {
            status: 500,
            message: '[AuthService] Could not confirm email address.',
          };
          return errorMessage;
        }
      } else {
        const alreadyConfirmedMessage: HttpResponseDto = {
          status: 400,
          message: '[AuthService] Email has already been confirmed',
        };
        return alreadyConfirmedMessage;
      }
    } catch (err) {
      Logger.debug(
        `[AuthService] Could not find record for given email, ${err}`,
      );
    }
  }

  /**
   * Sign in with email/password credentials
   *
   * @param email user email as string{}
   * @param password user password as string{}
   *
   * @returns authorization token as string{}
   */
  async signIn(email: string, password: string): Promise<string> {
    /// 1. Fetch the user with the passed email address
    const user: User = await this.repo.findOne({
      where: {email}
    })

    /// 2. If user exists, check if password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      /// 3. Return access token
      const payload: IJwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return accessToken;
    } else {
      throw new UnauthorizedException('Please check login credentials')
    }
  }

  /**
   * Sign in with Google credentials
   */
  async signInWithGoogle() {
    // TODO: Add sign in with Google logic
  }

  /**
   * Sign in with Apple credentials
   */
  async signInWithApple() {
    // TODO: Add sign in with Apple logic
  }
}
