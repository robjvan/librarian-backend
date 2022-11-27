import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/common/entities/author.entity';
import { Book } from 'src/common/entities/book.entity';
import { Description } from 'src/common/entities/description.entity';
import { Isbn10 } from 'src/common/entities/isbn10.entity';
import { Isbn13 } from 'src/common/entities/isbn13.entity';
import { PublishYear } from 'src/common/entities/publish-year.entity';
import { Publisher } from 'src/common/entities/publisher.entity';
import { ThumbnailUrl } from 'src/common/entities/thuimbnail-url.entity';
import { Title } from 'src/common/entities/title.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  @InjectRepository(Book)
  private readonly booksRepo: Repository<Book>;
  @InjectRepository(Title)
  private readonly titlesRepo: Repository<Title>;
  @InjectRepository(Author)
  private readonly authorsRepo: Repository<Author>;
  @InjectRepository(Description)
  private readonly descriptionsRepo: Repository<Description>;
  @InjectRepository(Publisher)
  private readonly publishersRepo: Repository<Publisher>;
  @InjectRepository(PublishYear)
  private readonly publishYearsRepo: Repository<PublishYear>;
  @InjectRepository(Isbn10)
  private readonly isbn10sRepo: Repository<Isbn10>;
  @InjectRepository(Isbn13)
  private readonly isbn13sRepo: Repository<Isbn13>;
  @InjectRepository(ThumbnailUrl)
  private readonly thumbnailUrlsRepo: Repository<ThumbnailUrl>;

  /** Retrieve all books
   *
   * @returns array of [Book]
   */
  async findAllBooks(): Promise<Book[]> {
    let results: Book[] = [];
    try {
      results = await this.booksRepo.find();
    } catch (err) {
      Logger.debug('[BooksService] Could not retrieve list of books', err);
    }
    return results;
  }

  /** Retrieve all books for User
   *
   * @param userId id of current user
   * @returns array of [Book]
   */
  async findAllUserBooks(userId: number): Promise<Book[]> {
    let results: Book[] = [];
    try {
      results = await this.booksRepo.findBy({ id: userId });
    } catch (err) {
      Logger.debug('[BooksService] Could not retrieve list of books', err);
    }
    return results;
  }

  /** Find book by ID
   *
   * @param id id of desired book
   * @returns book with passed id
   */
  async findOneById(id: number): Promise<Book> {
    let result;
    try {
      result = await this.booksRepo.findOneBy({ id });
    } catch (err) {
      Logger.debug(`[BooksService] Could not retrieve book with id ${id}`, err);
    }
    return result;
  }

  /** Delete a book from the db
   *
   * @param id ID of book entry to delete
   */
  async deleteBookById(id: number): Promise<Book> {
    let result: Book;

    const record: Book = await this.findOneById(id);

    try {
      result = await this.booksRepo.remove(record);
    } catch (err) {
      Logger.error(`Could not remove remove with id ${id}`, err);
    }

    if (!result) {
      throw new InternalServerErrorException(
        `Error removing book with ID ${id}`,
      );
    }

    return result;
  }

  /** Update a single book by ID
   *
   * @param id ID of book entry to update
   * @param details new book details to write to db
   */
  async updateBookById(id: number, newData: Partial<Book>): Promise<Book> {
    let result: Book;

    const record: Book = await this.findOneById(id);

    Object.assign(record, newData);

    try {
      result = await this.booksRepo.save(record);
    } catch (err) {
      Logger.error(`Could not update record with Id ${id}`, err);
    }

    if (!result) {
      throw new InternalServerErrorException(
        `Could not update record with Id ${id}`,
      );
    }

    return result;
  }

  /** Check DB for Description value    
   * Check DB for passed title and retrieve ID, or create new entry if not found
   * 
   * @param value Description blurb of book
   * @returns ID of description record if found
   */
  async processDescription(value: string): Promise<number> {
    const descriptionRecord: Description = await this.descriptionsRepo.findOne({
      where: { value },
    });
    if (descriptionRecord) {
      return descriptionRecord.id;
    } else {
      // create new record in Description table and use that ID
      const newDescription: Description = this.descriptionsRepo.create({
        value,
      });
      try {
        const descriptionResult = await this.descriptionsRepo.save(
          newDescription,
        );
        return descriptionResult.id;
      } catch (err) {
        Logger.error(`Could not save new description to DB`, err);
        return undefined;
      }
    }
  }

  /** Check DB for Author value  
   * Check DB for passed title and retrieve ID, or create new entry if not found
   * 
   * @param name Author name for the book
   * @returns ID of the author record if found
   */
  async processAuthor(name: string): Promise<number> {
    const authorRecord: Author = await this.authorsRepo.findOne({
      where: { name },
    });
    if (authorRecord) {
      return authorRecord.id;
    } else {
      // create new record in Author table and use that ID
      const newAuthor: Author = this.authorsRepo.create({
        name,
      });
      try {
        const authorResult = await this.authorsRepo.save(newAuthor);
        return authorResult.id;
      } catch (err) {
        Logger.error(`Could not save new author to DB`, err);
        return undefined;
      }
    }
  }

  /** Check DB for Title value  
   * Check DB for passed title and retrieve ID, or create new entry if not found
   * 
   * @param value Title value for the book
   * @returns ID of the title record if found
   */
  async processTitle(value: string): Promise<number> {
    const titleRecord: Title = await this.titlesRepo.findOneBy({
      value,
    });
    if (titleRecord) {
      return titleRecord.id;
    } else {
      // create new record in Title table and use that ID
      const newTitle: Title = this.titlesRepo.create({
        value,
      });
      try {
        const titleResult = await this.titlesRepo.save(newTitle);
        return titleResult.id;
      } catch (err) {
        Logger.error(`Could not save new title to DB`, err);
        return undefined;
      }
    }
  }

  /** Check DB for Publisher value 
   * Check DB for passed publisher and retrieve ID, or create new entry if not found
   * 
   * @param name Publisher name for the book
   * @returns ID of the publisher record if found
   */
  async processPublisher(name: string): Promise<number> {
    const publisherRecord: Publisher = await this.publishersRepo.findOne({
      where: { name },
    });
    if (publisherRecord) {
      return publisherRecord.id;
    } else {
      // create new record in Title table and use that ID
      const newPublisher: Publisher = this.publishersRepo.create({
        name,
      });
      try {
        const publisherResult = await this.publishersRepo.save(newPublisher);
        return publisherResult.id;
      } catch (err) {
        Logger.error(`Could not save new Publisher to DB`, err);
        return undefined;
      }
    }
  }

  /** Check DB for PublishYear value  
   * Check DB for passed publishYear and retrieve ID, or create new entry if not found
   * 
   * @param value Publish Year for the book
   * @returns ID of the publishYear record if found
   */
  async processPublishYear(value: number): Promise<number> {
    const publishYearRecord: PublishYear =
      await this.publishYearsRepo.findOneBy({
        value,
      });
    if (publishYearRecord) {
      return publishYearRecord.id;
    } else {
      // create new record in Title table and use that ID
      const newPublishYear: Isbn10 = this.publishYearsRepo.create({
        value,
      });
      try {
        const publishYearResult = await this.publishYearsRepo.save(
          newPublishYear,
        );
        return publishYearResult.id;
      } catch (err) {
        Logger.error(`Could not save new PublishYear to DB`, err);
        return undefined;
      }
    }
  }
  
  /**Check DB for ISBN10 value
   * Check DB for passed ISBN10 and retrieve ID, or create new entry if not found
   * 
   * @param value Isbn10 for the book
   * @returns ID of the ISBN10 record if found
   */
  async processIsbn10(value: number): Promise<number> {
    const isbn10Record: Isbn10 = await this.isbn10sRepo.findOneBy({
      value,
    });
    if (isbn10Record) {
      return isbn10Record.id;
    } else {
      // create new record in Title table and use that ID
      const newIsbn10: Isbn10 = this.isbn10sRepo.create({
        value,
      });
      try {
        const isbn10Result = await this.isbn10sRepo.save(newIsbn10);
        return isbn10Result.id;
      } catch (err) {
        Logger.error(`Could not save new ISBN10 to DB`, err);
        return undefined;
      }
    }
  }
  
  /**Check DB for ISBN13 value
   * Check DB for passed ISBN13 and retrieve ID, or create new entry if not found
   * 
   * @param value Isbn13 for the book
   * @returns ID of the ISBN13 record if found
   */
  async processIsbn13(value: number): Promise<number> {
    const isbn13Record: Isbn13 = await this.isbn13sRepo.findOneBy({
      value,
    });
    if (isbn13Record) {
      return isbn13Record.id;
    } else {
      // create new record in Title table and use that ID
      const newIsbn13: Isbn13 = this.isbn13sRepo.create({
        value,
      });
      try {
        const isbn13Result = await this.isbn13sRepo.save(newIsbn13);
        return isbn13Result.id;
      } catch (err) {
        Logger.error(`Could not save new ISBN13 to DB`, err);
        return undefined;
      }
    }
  }
  
  /**Check DB for ThumbnailUrl value
   * Check DB for passed ThumbnailUrl and retrieve ID, or create new entry if not found
   * 
   * @param value ThumbnailUrl for the book
   * @returns ID of the ThumbnailUrl record if found
   */

  async processThumbnailUrl(value: string): Promise<number> {
    const thumbnailUrlRecord: ThumbnailUrl =
      await this.thumbnailUrlsRepo.findOneBy({
        value,
      });
    if (thumbnailUrlRecord) {
      return thumbnailUrlRecord.id;
    } else {
      // create new record in Title table and use that ID
      const newThumbnailUrlRecord: ThumbnailUrl = this.thumbnailUrlsRepo.create(
        {
          value,
        },
      );
      try {
        const thumbnailUrlResult = await this.thumbnailUrlsRepo.save(
          newThumbnailUrlRecord,
        );
        return thumbnailUrlResult.id;
      } catch (err) {
        Logger.error(`Could not save new ThumbnailUrl to DB`, err);
        return undefined;
      }
    }
  }

  /** Add a new book to db
   *
   * @param userId ID of user that is adding book to db
   * @param details new book details to write to db
   */
  async createBook(userId: number, details: CreateBookDto): Promise<Book> {
    /// 1. Check each field for existing entry in DB
    const titleId = await this.processTitle(details.title);
    const authorId = await this.processAuthor(details.author);
    const descriptionId = await this.processDescription(details.description);
    const publisherId = await this.processPublisher(details.publisher);
    const publishYearId = await this.processPublishYear(details.publishYear);
    const isbn10Id = await this.processIsbn10(details.isbn10);
    const isbn13Id = await this.processIsbn13(details.isbn13);
    const thumbnailUrlId = await this.processThumbnailUrl(details.thumbnailUrl);

    /// 3. Assign data to [newBook] object
    const newBook: Book = this.booksRepo.create({
      userId: userId,
      titleId: titleId,
      authorId: authorId,
      descriptionId: descriptionId,
      publisherId: publisherId,
      publishYearId: publishYearId,
      isbn10Id: isbn10Id,
      isbn13Id: isbn13Id,
      thumbnailUrlId: thumbnailUrlId,
      isMature: details.isMature,
      inFavesList: details.inFavesList,
      inShoppingList: details.inShoppingList,
      inWishlist: details.inWishlist,
      haveRead: details.haveRead,
      pageCount: details.pageCount,
    });
    /// 4. Save new entry to db
    let result: Book;
    try {
      result = await this.booksRepo.save(newBook);
    } catch (err) {
      Logger.error(`Could not save new book to database`, err);
    }

    if (!result) {
      throw new InternalServerErrorException();
    }

    /// 5. Return created book entry
    return result;
  }
}
