import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Book } from 'src/models/book.entity';
import { GetBooksFilterDto } from 'src/models/get-books-with-filters.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  // constructor() {}

  /**
   * Return all available books for given user ID
   * @param user
   * @returns
   */
  async getAllBooks(id): Promise<any[]> {
    return this.books;
  }

  async getBooksWithFilters(filterDto: GetBooksFilterDto): Promise<Book[]> {
    // TODO: Add filtering logic
    return this.books;
  }

  findOneById(id: string): Book {
    const _tempBook: Book = {
      title: 'Temp Book',
      description: '',
      id: uuid,
      pageCount: 200,
    };

    return _tempBook;
  }
}
