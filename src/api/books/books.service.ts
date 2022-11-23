import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/common/entities/book.entity';
import { BookDetailsDto } from 'src/api/books/dto/book-details.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  @InjectRepository(Book)
  private readonly booksRepo: Repository<Book>;

  /**
   * Retrieve all books 
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

  /**
   * Retrieve all books for User
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

  /**
   * Find book by ID
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
      throw new InternalServerErrorException(`Error removing book with ID ${id}`);
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
      throw new InternalServerErrorException(`Could not update record with Id ${id}`);
    }

    return result;
  }

  /** Add a new book to db
   * 
   * @param userId ID of user that is adding book to db
   * @param details new book details to write to db
   */
  async createBook(userId: number, details: BookDetailsDto): Promise<Book> {
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
