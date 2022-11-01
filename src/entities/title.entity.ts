import { IsNumber, IsString } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;
  
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