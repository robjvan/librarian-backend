import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
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
  async findAllBooks(userId: number) {
    let results: Book[] = [];
    try {
      Logger.debug(`[BooksService] Retrieving list of books ...`)
      results = await this.repo.findBy({ id: userId });
    } catch (err) {
      Logger.debug(`[BooksService] Could not retrieve list of books: ${err}`)
    }
    return results;
  }

  /**
   * Find book by ID
   * @param id id of desired book
   * @returns book with passed id
   */
  async findBookById(id: number) {
    let result;
    try {
      Logger.debug(`[BooksService] Retrieving book with id ${id}`);
      result = await this.repo.findOneBy({ id });
    }catch (err) {
      Logger.debug(`[BooksService] Could not retrieve book with id ${id}`)
    }
    return result;
  }
}
