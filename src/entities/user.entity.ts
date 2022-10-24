import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

export class User {
  @PrimaryGeneratedColumn()
  @OneToMany(_type => Book, book => book.userID, { eager: true }) /// eager means we will automatically fetch the tasks 
  id: number;

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
}