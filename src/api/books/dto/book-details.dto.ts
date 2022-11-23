import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BookDetailsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  pages?: number;

  @IsNumber()
  @IsOptional()
  authorId?: number;

  @IsNumber()
  @IsOptional()
  publisherId?: number;

  @IsNumber()
  @IsOptional()
  publishYear?: number;
  
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}