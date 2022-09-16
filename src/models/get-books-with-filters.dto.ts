import { IsOptional, IsString } from "class-validator";

export class GetBooksFilterDto {
  @IsOptional()
  @IsString()
  search: string;
}