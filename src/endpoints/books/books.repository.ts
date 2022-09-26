import librarianDataSource from "src/data.source";
import { Book } from "src/entities/book.entity";
import { GetBooksFilterDto } from "src/entities/dto/get-books-with-filters.dto";

export const BooksRepository = librarianDataSource.getRepository(Book).extend({
  // TODO: Add custom methods here

  async getBooks(searchTerm: string): Promise<Book[]> {
    const { search } = searchTerm;
    const query = this.createQueryBuilder('book');

    query.andWhere(
      'LOWER(book.title) LIKE LOWER(:search)', { search: `%${search}%`}
    )

    const books = await query.getMany();
    return books;
  }
})