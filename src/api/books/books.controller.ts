import { Controller, Get } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  getAllBooks(@GetUser() user: User) {
    return this.booksService.findAllBooks(user.id);
  }

  @Get('/:id')
  getBookById(id: number) {
    return this.booksService.findBookById(id);
  }
}
