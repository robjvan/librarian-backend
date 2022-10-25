import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./author.entity";
import { PublishYear } from "./publish-year.entity";
import { Publisher } from "./publisher.entity";
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
  pages: number;

  @Column()
  @ManyToOne(() => Author, (author) => author.id) 
  authorID: number;

  @Column()
  @ManyToOne(() => Publisher, (publisher) => publisher.id) 
  publisherID: number;

  @Column()
  @ManyToOne(() => PublishYear, (publishYear) => publishYear.id)
  publishYear: string;
  
  @ManyToOne(() => User, (user) => user.id)
  userID: number;
}