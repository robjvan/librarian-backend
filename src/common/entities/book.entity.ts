import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @ManyToOne(() => Title, (title) => title.id)
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  pageCount: number;

  @Column({ nullable: true })
  // @ManyToOne(() => Author, (author) => author.id)
  authorId: number;

  @Column({ nullable: true })
  // @ManyToOne(() => Publisher, (publisher) => publisher.id)
  publisherId: number;

  @Column({ nullable: true })
  // @ManyToOne(() => PublishYear, (publishYear) => publishYear.id)
  publishYearId: number;

  @Column()
  // @ManyToOne(() => User, (user) => user.id)
  userId: number;

  @Column({ default: false })
  haveRead: boolean;

  @Column({ default: false })
  inWishlist: boolean;

  @Column({ default: false })
  inFavesList: boolean;

  @Column({ default: false })
  inShoppingList: boolean;

  @Column({ nullable: true })
  isbn10: number;

  @Column({ nullable: true })
  isbn13: number;

  @Column({ default: false })
  isMature: boolean;

  @Column({ default: 0 })
  rating: number;

  @Column({ nullable: true })
  sortTitle: string;

  @Column({ nullable: true })
  sortAuthor: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

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
