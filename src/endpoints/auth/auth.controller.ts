import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {}

  @Get('')
  respond() {
    return {status: '400', message: '/auth OK'};
  }

  @Post('/signup')
  signUp(@Body() body: UserSignupDto): void {
    const { email, password, username } = body;
    this.authService.signUp(email, password, username);

    // return {status: '201', message: `/auth/signup OK!  dto = ${email}, ${password}, ${username}
    // `};
  }
}
