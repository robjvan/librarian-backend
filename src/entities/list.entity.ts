import { IsString, Length } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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