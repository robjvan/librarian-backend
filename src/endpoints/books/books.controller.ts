import { Controller, Req, Get, Param, Bind, Body, Query } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { GetBooksFilterDto } from 'src/entities/dto/get-books-with-filters.dto';
import { ParamTypeIdPipe } from 'src/pipes/param.type.id.pipe';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // @Get()
  // respond() {
  //   console.log('/api/books OK')
  //   return '/api/books OK'
  // }

  /// GET all books for a given user id
  @Get()
  async getAllBooksForUser(
    @Query() searchTerm: string,
  ): Promise<Book[]> {
    // if (Object.keys(filterDto).length) {
    //   return await this.booksService.getBooks(filterDto);
    // } else {
    return await this.booksService.getBooks(searchTerm);
    // }
  }

  /**
   * GET a single book by given id
   * @param id
   * @param req
   * @returns
   */
  // @Get(':id')
  // @Bind(Param('id', new ParamTypeIdPipe()))
  // async findAll(id: any, @Req() req: any) {
  //   return await this.booksService.findOneById(id);
  // }

  /// Get ALL books (maybe?)

  /// PATCH to update a book by given id

  /// DELETE a book by given id

  /// Find books with queryParams
}
