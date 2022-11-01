import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  respond(req, res, next) {
    return this.userService.getAllUsers();
    // return {status: '400', message: 'api/user OK'};
  }

  /// POST to create a user

  /// GET user details by id
  @Get('/:id')
  getUserDetails(@Param('id') id: number) {
    // TODO: Add user not found error/message
    return this.userService.getUser(id);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    // TODO: Add user not found error/message
    return this.userService.deleteUser(id);
  }

  /// PATCH to update user details (save())

  /// DELETE a user (remove())

}
