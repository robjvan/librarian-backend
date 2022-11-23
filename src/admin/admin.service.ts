import {
  Injectable,
  // Logger,
} from '@nestjs/common';
// import { UserSubscriptionService } from 'src/api/users/user-subscription.service';
// import { UsersService } from 'src/api/users/users.service';

@Injectable()
export class AdminService {

  /** Clear DB tables */
  async clearTables(): Promise<void> {
    //
  }
}
