import { IsString, Length } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Book, (book) => book.authorId)
  id: number;

  @Column()
  @IsString()
  @Length(3,32)
  name: string;

  @Column()
  @IsString()
  @Length(3,32)
  sortName: string;
  
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