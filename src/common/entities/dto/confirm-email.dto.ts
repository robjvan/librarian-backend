import { IsEmail } from "class-validator";

export class ConfirmEmailDto {
  @IsEmail()
  email: string;
}