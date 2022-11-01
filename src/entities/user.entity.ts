import { IsEmail, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "./book.entity";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @OneToMany(_type => Book, book => book.userId, { eager: true }) /// eager means we will automatically fetch the tasks 
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;
  
  @Column()
  @IsString()
  username: string;
  
  @Column()
  @IsString()
  password: string;
  
  @Column({ default: 'https://placekitten.com/200/200'})
  @IsOptional()
  @IsString()
  profilePicUrl: string;
  
  @Column('boolean', {default: false})
  emailConfirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}