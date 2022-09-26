import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  pageCount: number;
}