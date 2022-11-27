import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  title: string;
  
  @IsString()
  @IsOptional()
  description: string;
  
  @IsNumber()
  @IsOptional()
  pageCount: number;
  
  @IsString()
  @IsOptional()
  author: string;
  
  @IsString()
  @IsOptional()
  publisher: string;
  
  @IsNumber()
  @IsOptional()
  publishYear: number;

  @IsBoolean()
  @IsOptional()
  haveRead: boolean;

  @IsBoolean()
  @IsOptional()
  inWishlist: boolean;

  @IsBoolean()
  @IsOptional()
  inShoppingList: boolean;

  @IsBoolean()
  @IsOptional()
  inFavesList: boolean;

  @IsBoolean()
  @IsOptional()
  isMature: boolean;
  
  @IsNumber()
  @IsOptional()
  isbn10: number;
  
  @IsNumber()
  @IsOptional()
  isbn13: number;
  
  @IsNumber()
  @IsOptional()
  rating: number;
  
  @IsString()
  @IsOptional()
  thumbnailUrl: string;
}