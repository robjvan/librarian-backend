import { Injectable } from "@nestjs/common";

@Injectable()
export class BooksService {
  // constructor() {}

  /**
   * Find all available books with given user ID
   * @param user 
   * @returns 
   */
  async findAll(user): Promise<any[]> {
    return [];
  }
}