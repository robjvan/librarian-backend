import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from 'src/common/entities/book.entity';
import { Title } from 'src/common/entities/title.entity';
import { Author } from 'src/common/entities/author.entity';
import { Description } from 'src/common/entities/description.entity';
import { Publisher } from 'src/common/entities/publisher.entity';
import { PublishYear } from 'src/common/entities/publish-year.entity';
import { Isbn10 } from 'src/common/entities/isbn10.entity';
import { Isbn13 } from 'src/common/entities/isbn13.entity';
import { ThumbnailUrl } from 'src/common/entities/thumbnail-url.entity';
import { SortAuthor } from 'src/common/entities/sort-author.entity';
import { SortTitle } from 'src/common/entities/sort-title.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
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
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
