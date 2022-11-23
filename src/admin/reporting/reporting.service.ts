import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/common/entities/book.entity';

//* Reporting service will push key metrics to the front end
//* Restricted to admins only 

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
  ) {}

  //! Must be restricted to ONLY admin users!

  // Useful metrics:
  //    User tier counts - free, monthly, annual
  //    User activity counts - Logged in within last 7/30/90 days
  //    Book counts - total, by author, created within last 7/30/90 days

  // Fun/nonsense metrics:
  //    Most popular author? Title? Length of average book? 
}