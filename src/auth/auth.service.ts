import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponseDto } from 'src/entities/dto/http-response.dto';
import { UserSignupDto } from 'src/entities/dto/user-signup.dto';
import { User } from 'src/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
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
    // TODO: Add sign in logic
    return '';
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
