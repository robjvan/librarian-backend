import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCountry } from 'src/common/entities/country.entity';
import { DemographicInfo } from 'src/common/entities/demographic-info.entity';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { User } from 'src/common/entities/user.entity';
import { UserSubscriptionService } from './user-subscription.service';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSubscription,
      UserCountry,
      DemographicInfo,
      UserLoginRecord,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UsersService, UserSubscriptionService],
})
export class UserModule {}
