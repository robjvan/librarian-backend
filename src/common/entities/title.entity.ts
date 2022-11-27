import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
  
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