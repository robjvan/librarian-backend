import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  // TODO: Add missing fields
}