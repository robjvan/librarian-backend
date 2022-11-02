import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/common/entities/book.entity';
import { BookDetailsDto } from 'src/common/entities/dto/book-details.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  @InjectRepository(Book)
  private readonly repo: Repository<Book>;

  /**
   * Retrieve all books for User
   * @param userId id of current user
   * @returns array of [Book]
   */
  async findAllBooks(userId: number): Promise<Book[]> {
    let results: Book[] = [];
    try {
      Logger.debug(`[BooksService] Retrieving list of books ...`);
      results = await this.repo.findBy({ id: userId });
    } catch (err) {
      Logger.debug(`[BooksService] Could not retrieve list of books: ${err}`);
    }
    return results;
  }

  /**
   * Find book by ID
   * @param id id of desired book
   * @returns book with passed id
   */
  async findBookById(id: number): Promise<Book> {
    let result;
    try {
      Logger.debug(`[BooksService] Retrieving book with id ${id}`);
      result = await this.repo.findOneBy({ id });
    } catch (err) {
      Logger.debug(`[BooksService] Could not retrieve book with id ${id}`);
    }
    return result;
  }

  /**
   * Delete a book from the db
   * @param id ID of book entry to delete
   */
  async deleteBookById(id: number): Promise<void> {
    // TODO: Add delete book logic
    /// 1. Check if book with passed ID  exists in db, if not return 404
    /// 2. Delete book from db using passed ID
  }

  /**
   * Update a single book by ID
   * @param id ID of book entry to update
   * @param details new book details to write to db
   */
  async updateBook(id: number, details: BookDetailsDto): Promise<Book> {
    // TODO: Add logic to update a book entry

    /// 1. Check if book with passed ID exists in db, if not return 404

    /// 2. Write [updatedBook] object to db

    /// 3. Return updated book entry

    return new Book();
  }

  /**
   * Add a new book to db
   * @param userId ID of user that is adding book to db
   * @param details new book details to write to db
   */
  async addBook(userId: number, details: BookDetailsDto): Promise<Book> {
    // TODO: Add logic to create a book entry

    /// 1. Check for pre-existing entry using userID and book details

    /// 2. Check if author/publisher/title/publish-year exist in DB
    ///   2a. If not exists, add it and retrieve ID
    ///   2b. If exists, retrieve ID

    /// 3. Assign data to [newBook] object

    /// 4. Save new entry to db

    /// 5. Return created book entry

    return new Book();
  }
}
