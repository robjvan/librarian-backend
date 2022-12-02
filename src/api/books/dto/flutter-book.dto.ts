import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class FlutterBookDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;
  
  @IsNumber()
  @IsOptional()
  userId: number;

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
  
  @IsNumber()
  @IsOptional()
  isbn10: number;
  
  @IsNumber()
  @IsOptional()
  isbn13: number;
  
  @IsBoolean()
  @IsOptional()
  isMature: boolean;
  
  @IsNumber()
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  sortTitle: string;

  @IsString()
  @IsOptional()
  sortAuthor: string;

  @IsString()
  @IsOptional()
  thumbnailUrl: string;
}