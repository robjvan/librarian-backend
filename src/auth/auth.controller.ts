import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from '../entities/dto/user-signup.dto';
import { UserCredentialsDto } from 'src/entities/dto/user-credentials.dto';
import { ConfirmEmailDto } from 'src/entities/dto/confirm-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  respond() {
    return { status: '400', message: '/auth OK' };
  }

  @Post('/signup')
  signUp(@Body() body: UserSignupDto) {
    try {
      return this.authService.createUser(body);
    } catch {
      return { status: '500', message: 'Could not create new user' };
    }
  }

  @Get('/signin')
  signIn(@Body() body: UserCredentialsDto) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }

  @Post('/confirmEmail')
  confirmEmail(@Body() body: ConfirmEmailDto) {
    const { email } = body;
    return this.authService.confirmEmail(email);
  }
}
