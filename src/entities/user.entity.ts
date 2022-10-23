import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;
  
  @Column()
  username: string;
  
  @Column()
  password: string;
  
  @Column()
  profilePicUrl: string;
  
  @Column()
  emailConfimed: boolean;  
  
  @OneToMany(_type => Book, book => book.user, { eager: true }) /// eager means we will automatically fetch the tasks 
  books: number[]
}