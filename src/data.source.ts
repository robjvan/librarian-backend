import { DataSource } from 'typeorm';
import { Book } from "./entities/book.entity";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const librarianDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: true,
  migrations: [],
  entities: [Book],
  database: process.env.DB_NAME
});

export default librarianDataSource;