import { IsNumber, IsString } from "class-validator";
import { title } from "process";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./author.entity";
import { List } from "./list.entity";
import { PublishYear } from "./publish-year.entity";
import { Publisher } from "./publisher.entity";
import { Title } from "./title.entity";
import { User } from "./user.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => Title, (title) => title.id)
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsNumber()
  pages: number;

  @Column()
  @ManyToOne(() => Author, (author) => author.id) 
  authorId: number;

  @Column()
  @IsNumber()
  @ManyToOne(() => Publisher, (publisher) => publisher.id) 
  publisherId: number;

  @Column()
  @IsString()
  @ManyToOne(() => PublishYear, (publishYear) => publishYear.id)
  publishYear: string;
  
  @Column()
  @IsNumber()
  @ManyToOne(() => User, (user) => user.id)
  userId: number;
  
  /// Hooks
  @AfterInsert()
  afterInsert() {
    // TODO: Add logging messages
  }

  @AfterRemove()
  afterRemove() {
    // TODO: Add logging messages
  }

  @AfterUpdate()
  afterUpdate() {
    // TODO: Add logging messages
  }
}