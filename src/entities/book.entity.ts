import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  pageCount: number;

  @Column()
  authorID: number;

  @Column()
  publisherID: number;

  @Column()
  publishYear: string;
  
  @ManyToOne((_type) => User) /// eager means we will automatically fetch the tasks 
  userID: number;
}