import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from 'src/api/books/books.service';
import { UserSubscriptionService } from 'src/api/users/user-subscription.service';
import { UsersService } from 'src/api/users/users.service';
import { Book } from 'src/common/entities/book.entity';
import { UserCountry } from 'src/common/entities/country.entity';
import { DemographicInfo } from 'src/common/entities/demographic-info.entity';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { User } from 'src/common/entities/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      User,
      UserSubscription,
      UserCountry,
      UserLoginRecord,
      DemographicInfo,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  controllers: [AdminController],
  providers: [UsersService, UserSubscriptionService, BooksService, AdminService],
})
export class AdminModule {}
