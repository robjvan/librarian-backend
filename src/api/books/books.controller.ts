import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { BookDetailsDto } from 'src/common/entities/dto/book-details.dto';
import { User } from 'src/common/entities/user.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  getAllBooks(@GetUser() user: User) {
    return this.booksService.findAllBooks(user.id);
  }

  @Get('/:id')
  getBookById(@Param('id') id: number) {
    return this.booksService.findBookById(id);
  }

  @Post('')
  addBook(@GetUser() user: User, details: BookDetailsDto) {
    return this.booksService.addBook(user.id, details);
  }

  @Patch('/:id')
  updateBookDetails(@Param('id') id: number, details: BookDetailsDto) {
    return this.booksService.updateBook(id, details);
  }

  @Delete('/:id')
  deleteBookById(@Param('id') id: number) {
    return this.booksService.deleteBookById(id);
  }
}
