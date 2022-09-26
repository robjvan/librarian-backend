import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Book } from 'src/entities/book.entity';
import { GetBooksFilterDto } from 'src/entities/dto/get-books-with-filters.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  async getBooks(searchTerm: string): Promise<any[]> {
    return BooksRepository.getBooks(searchTerm);
  }

  // async getBooksWithFilters(filterDto: GetBooksFilterDto): Promise<Book[]> {
  //   // TODO: Add filtering logic
  //   return this.books;
  // }

  // findOneById(id: string): Book {
  //   const _tempBook: Book = {
  //     title: 'Temp Book',
  //     description: '',
  //     id: uuid,
  //     pageCount: 200,
  //   };

  //   return _tempBook;
  // }
}
