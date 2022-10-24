import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignupDto } from 'src/entities/dto/user-signup.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repo: Repository<User>;

  async createUser(user: UserSignupDto): Promise<User> {
    try {
      Logger.debug('[AuthService] Saving new user to db...');
      const newUser = this.repo.save(user);
      return newUser;
    } catch (err) {
      Logger.error(`[AuthService] Could not save new user to db: ${err}`);
    }
  }

  signIn(email: string, password: string) {
    //
  }

  async confirmEmail(email: string) {
    Logger.debug(`[AuthService] Passed email = ${email}`);
    try {
      const user: User = await this.repo.findOneBy({ email });
      Logger.debug(`[AuthService] user.emailConfirmed = ${user.emailConfirmed}`);

      if (!user.emailConfirmed) {
        Logger.debug(`[AuthService] Confirming email address: ${email}`);
        return this.repo
          .createQueryBuilder()
          .update(User)
          .set({ emailConfirmed: true })
          .where({ email })
          .execute();
      } else {
        return { status: 400, message: '[AuthService] Email has already been confirmed' };
      }
    } catch {}

    // this.repo.update({email: email, emailConfimed: true}, User);
  }
}
