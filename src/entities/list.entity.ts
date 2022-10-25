import { IsString, Length } from "class-validator";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(3, 32)
  name: string;

  @OneToMany(() => User, (user) => user.id)
  userId: number;
}