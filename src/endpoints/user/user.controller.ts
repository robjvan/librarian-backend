import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
constructor(private readonly userService: UserService) {}

@Get()
respond(req, res, next) {
  return {status: '400', message: 'api/user OK'};
}

/// POST to create a user

/// GET user details by id

/// PATCH to update user details

/// DELETE a user

}
