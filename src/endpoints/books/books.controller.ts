import { Controller, Req, Get, Param, Bind, Body } from '@nestjs/common';
import { Book } from 'src/models/book.entity';
import { GetBooksFilterDto } from 'src/models/get-books-with-filters.dto';
import { ParamTypeIdPipe } from 'src/pipes/param.type.id.pipe';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooksForUser(@Body() filterDto: GetBooksFilterDto): Promise<Book[]> {
    if (Object.keys(filterDto).length) {
      return await this.booksService.getBooksWithFilters(filterDto);
    } else {
      return await this.booksService.getAllBooks(filterDto);
    }
  }

  /**
   * Get single book by ID
   * @param id
   * @param req
   * @returns
   */
  @Get(':id')
  @Bind(Param('id', new ParamTypeIdPipe()))
  async findAll(id: any, @Req() req: any) {
    return await this.booksService.findOneById(id);
  }
}
