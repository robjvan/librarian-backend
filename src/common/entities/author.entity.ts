import { Logger } from "@nestjs/common";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Author {
  private readonly logger: Logger = new Logger(Author.name);

  @PrimaryGeneratedColumn()
  // @OneToMany(() => Book, (book) => book.authorId)
  id: number;

  @Column()
  name: string;
  
  /// Hooks
  @AfterInsert()
  afterInsert() {
    this.logger.debug(`Author ${this.name} successfully added to DB - ID #${this.id}`);
  }

  @AfterRemove()
  afterRemove() {
    this.logger.debug(`Author ${this.name} successfully removed from DB`);
  }

  @AfterUpdate()
  afterUpdate() {
    this.logger.debug(`Author ${this.name} successfully updated`);
  }
}