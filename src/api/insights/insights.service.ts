import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/common/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsightsService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
  ) {}
  
  /** Return total number of books for a user
   * 
   * @param userId Id of user to count books for
   * @returns Number of books that currently exist in DB for the given userId
   */
   async countAllBooks(userId: number): Promise<number> {
    let booksCount = 0;

    try {
      booksCount = (await this.booksRepo.find({ where: { userId } })).length;
    } catch (err) {
      Logger.error(`Could not fetch list of books for user ${userId}`, err);
    }

    return booksCount;
  }
}
