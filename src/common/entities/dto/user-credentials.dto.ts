import { IsEmail, IsString, Length, Matches } from "class-validator";

export class UserCredentialsDto {
  @IsEmail()
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
}