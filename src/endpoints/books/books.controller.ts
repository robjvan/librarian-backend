import { Controller, Req, Get, Param, Bind } from '@nestjs/common';
import { ParamTypeIdPipe } from 'src/pipes/param.type.id.pipe';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  respond(req, res, next) {
    return {
      message: 'Ahoyhoy',
    };
  }

  @Get(':id')
  @Bind(Param('id', new ParamTypeIdPipe()))
  async findAll(id: any, @Req() req: any): Promise<any[]> {
    return [`400 OK. [id] = ${id}`];
    // return await this.booksService.findAll(id);
  }

  /// Get all books 

  /// GET all books for a given user id
  
  /// GET a book by given id
  
  /// PATCH to update a book by given id

  /// DELETE a book by given id

  /// Find books with queryParams
}
