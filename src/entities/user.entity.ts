import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  // @OneToMany(_type => Book, book => book.userID, { eager: true }) /// eager means we will automatically fetch the tasks 
  id: number;

  @Column({ unique: true })
  email: string;
  
  @Column()
  username: string;
  
  @Column()
  password: string;
  
  @Column({ default: 'https://placekitten.com/200/200'})
  @IsOptional()
  profilePicUrl: string;
  
  @Column('boolean', {default: false})
  emailConfirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}