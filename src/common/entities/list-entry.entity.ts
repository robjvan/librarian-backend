import { IsString, Length } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class ListEntry {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(3, 32)
  title: string;

  @Column()
  @IsString()
  @Length(3, 32)
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