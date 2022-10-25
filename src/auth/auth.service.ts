import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponseDto } from 'src/entities/dto/http-response.dto';
import { UserSignupDto } from 'src/entities/dto/user-signup.dto';
import { User } from 'src/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repo: Repository<User>;

  /**
   * Save a new user to the database
   * @param user details for new user
   * @returns created user object
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
   * 
   * @param email address to be confirmed
   * @returns result of update operation
   */
  async confirmEmail(email: string): Promise<UpdateResult | HttpResponseDto>{ 
    try {
      const user: User = await this.repo.findOneBy({ email });

      if (!user.emailConfirmed) {
        Logger.debug(`[AuthService] Confirming email address: ${email}`);
        return this.repo
          .createQueryBuilder()
          .update(User)
          .set({ emailConfirmed: true })
          .where({ email })
          .execute();
      } else {
        return {
          status: 400,
          message: '[AuthService] Email has already been confirmed',
        };
      }
    } catch (err) {
      Logger.debug(`[AuthService] Could not confirm email address, ${err}`)
    }
  }

  /**
   * Sign in with standard credentials
   * @param email user email
   * @param password user password
   * @returns authorization token
   */
  signIn(email: string, password: string): string {
    return '';
  }

  /**
   * Sign in with Google credentials
   */
  signInWithGoogle() {
    // TODO: Add sign in with Google logic
  }

  /**
   * Sign in with Apple credentials
   */
  signInWithApple() {
    // TODO: Add sign in with Apple logic
  }
}
