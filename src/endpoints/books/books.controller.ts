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
    return await this.booksService.findAll(id);
  }
}
