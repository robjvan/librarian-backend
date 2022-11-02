import {
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserSignupDto {
  @IsEmail({ unique: true })
  email: string;

  @IsString()
  @Length(6, 32)
  @Matches(RegExp('(?=.*[a-z])'), {
    message:
      'Password must contain at least one lower case character',
  })
  @Matches(RegExp('(?=.*[A-Z])'), {
    message:
      'Password must contain at least one upper case character',
  })
  @Matches(RegExp('(?=.*[0-9])'), {
    message:
      'Password must contain at least one number',
  })
  @Matches(RegExp('(?=.*[-+_!@#$%^&*.,?])'), {
    message:
      'Password must contain at least one symbol',
  })
  password: string;

  @IsString()
  @Length(3, 32)
  username: string;
}
