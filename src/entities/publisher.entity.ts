import { IsString, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Book, (book) => book.publisherID)
  id: number;

  @Column()
  @IsString()
  @Length(3,32)
  name: string;
}
