import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Year {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;
}