import { Exclude } from "class-transformer";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./author.entity";
import { Publisher } from "./publisher.entity";
import { User } from "./user.entity";

export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  pageCount: number;

  @Column()
  authors: Author[];

  @Column()
  publishers: Publisher[];

  @Column()
  publishYear: string;
  
  @ManyToOne((_type) => User, (user) => user.books, { eager: false }) /// eager means we will automatically fetch the tasks 
  @Exclude({ toPlainOnly: true, })
  user: User;
}