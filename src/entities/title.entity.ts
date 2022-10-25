import { IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;
}