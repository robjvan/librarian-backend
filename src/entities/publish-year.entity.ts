import { Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class PublishYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4)
  @OneToMany(() => Book, (book) => book.publishYear)
  year: number;
}