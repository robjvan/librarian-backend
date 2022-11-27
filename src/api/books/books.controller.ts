import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { NewBookDto } from 'src/api/books/dto/new-book.dto';
import { User } from 'src/common/entities/user.entity';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('api/v1/books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  getAllBooks(@GetUser() user: User) {
    return this.booksService.findAllUserBooks(user.id);
  }

  @Get('/:id')
  getBookById(@Param('id') id: number) {
    return this.booksService.findOneById(id);
  }

  @Post('')
  addBook(@GetUser() user: User, @Body() details: CreateBookDto) {
    return this.booksService.createBook(user.id, details);
  }

  @Patch('/:id')
  updateBookDetails(@Param('id') id: number, details: NewBookDto) {
    return this.booksService.updateBookById(id, details);
  }

  @Delete('/:id')
  deleteBookById(@Param('id') id: number) {
    return this.booksService.deleteBookById(id);
  }
}
