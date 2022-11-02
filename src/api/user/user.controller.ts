import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  respond(req, res, next) {
    return this.userService.getAllUsers();
  }

  /// GET user details by id
  @Get('/:id')
  async getUserDetails(@Param('id') id: number) {
    const user = await this.userService.getUser(id);
    if (user) {
      return this.userService.getUser(id);
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
    const user = await this.userService.getUser(id);
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
