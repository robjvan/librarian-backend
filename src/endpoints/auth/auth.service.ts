import { Injectable } from '@nestjs/common';
import librarianDataSource from 'src/data.source';

@Injectable()
export class AuthService {
  // constructor()

  signUp(email: string, password: string, username: string) {
  }
}
