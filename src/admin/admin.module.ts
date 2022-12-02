import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from 'src/api/books/books.service';
import { UserSubscriptionService } from 'src/api/users/user-subscription.service';
import { UsersService } from 'src/api/users/users.service';
import { Book } from 'src/common/entities/book.entity';
import { UserCountry } from 'src/common/entities/country.entity';
import { DemographicInfo } from 'src/common/entities/demographic-info.entity';
import { Title } from 'src/common/entities/title.entity';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { User } from 'src/common/entities/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Author } from 'src/common/entities/author.entity';
import { Description } from 'src/common/entities/description.entity';
import { Publisher } from 'src/common/entities/publisher.entity';
import { PublishYear } from 'src/common/entities/publish-year.entity';
import { Isbn10 } from 'src/common/entities/isbn10.entity';
import { Isbn13 } from 'src/common/entities/isbn13.entity';
import { ThumbnailUrl } from 'src/common/entities/thumbnail-url.entity';
import { SortTitle } from 'src/common/entities/sort-title.entity';
import { SortAuthor } from 'src/common/entities/sort-author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      User,
      UserSubscription,
      UserCountry,
      UserLoginRecord,
      DemographicInfo,
      Title,
      Author,
      Description,
      Publisher,
      PublishYear,
      Isbn10,
      Isbn13,
      ThumbnailUrl,
      SortAuthor,
      SortTitle
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  controllers: [AdminController],
  providers: [UsersService, UserSubscriptionService, BooksService, AdminService],
})
export class AdminModule {}
