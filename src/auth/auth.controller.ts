import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, } from './dto/create_user.dto';
import { ConfirmEmailDto } from 'src/auth/dto/confirm-email.dto';
import { User } from 'src/common/entities/user.entity';
import { UserSigninDto } from './dto/user-signin.dto';
import { CheckUsernameDto } from './dto/check-username.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Create a new user
  @Post('/signup')
  signUp(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.createUser(body);
  }

  // Sign in as an existing user
  @Post('/signin')
  signIn(@Body() body: UserSigninDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(body);
  }

  // Confirm email address of an existing user
  @Post('/confirmemail')
  confirmEmail(@Body() body: ConfirmEmailDto): Promise<User> {
    return this.authService.confirmEmail(body);
  }

  /// Check if username already exists in DB
  @Post('/checkusername')
  checkIfUserExists(@Body() data: CheckUsernameDto): Promise<boolean> {
    return this.authService.checkIfUserExists(data.username);
  }
}
