import { Controller, Delete, Get, Param } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /// Get details about user that is currently signed in
  @Get()
  getUserDetails(@GetUser() user: User) {
    return this.userService.getUserById(user.id);
  }

  @Get('/allusers')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  /// GET user details by id
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    if (user) {
      return user;
    } else {
      return {
        status: 404,
        message: `User with ID ${id} not found`,
      };
    }
  }

  /// DELETE user details by id
  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    if (user) {
      return this.userService.deleteUser(id);
    } else {
      return {
        status: 404,
        message: `User with ID ${id} not found`,
      };
    }
  }

  /// PATCH to update user details (save())

  /// DELETE a user (remove())
}
