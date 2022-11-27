import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BooksService } from 'src/api/books/books.service';
import { UserSubscriptionService } from 'src/api/users/user-subscription.service';
import { UsersService } from 'src/api/users/users.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AuthGuard(), new AdminGuard())
export class AdminController {
  constructor(
    private adminService: AdminService,
    private userSubscriptionsService: UserSubscriptionService,
    private booksService: BooksService,
    private usersService: UsersService,
  ) {}

  /// Fetch all books
  @Get('/books')
  findAllBooks() {
    return this.booksService.findAllBooks();
  }

  /// Fetch all users
  @Get('/users')
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  // Fetch all subscriptions
  @Get('/subscriptions')
  findAllSubs() {
    return this.userSubscriptionsService.findAll();
  }

  /// Delete User by ID
  @Delete('/users/:id')
  getUserByUsername(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }

  /// Delete User by username
  @Delete('/users/username')
  deleteUserById(@Body() username: string) {
    return this.usersService.deleteUserByUsername(username);
  }

  // Get subscription information for user
  @Get('/users/:id/subscription')
  fetchSubscriptionDetails(@Param('id') userId: number) {
    return this.userSubscriptionsService.findOneByUserId(userId);
  }

  // Get user by ID
  @Get('/users/:id')
  findOneById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }
}
