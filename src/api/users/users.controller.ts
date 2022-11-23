import { Body, Controller, Get, Patch } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { UserSubscriptionService } from './user-subscriotion.service';
import { UsersService } from './users.service';

@Controller('api/v1/user')
export class UserController {
  constructor(
    private subscriptionService: UserSubscriptionService,
    private readonly usersService: UsersService,
  ) {}

  // Get current user data
  @Get('')
  findCurrent(@GetUser() user: User) {
    return this.usersService.findCurrent(user.id);
  }

  // Get subscription data for current user
  @Get('/subscription')
  fetchSubscriptionDetails(@GetUser() user: User) {
    return this.subscriptionService.findOneByUserId(user.id);
  }

  // Update user information
  @Patch('')
  updateUser(@GetUser() user: User, @Body() newData: Partial<User>) {
    this.usersService.updateUserRecordById(user.id, newData);
  }

  // Update user subscription data (upgrade or downgrade)
  @Patch('/subscription')
  updateSubscription(@GetUser() user: User) {
    // TODO: Finish this
  }

  // Promote current user to Admin
  @Patch('/promote')
  promoteUserAccount(@GetUser() user: User) {
    return this.usersService.promoteUserAccount(user.id);
  }

  // Close user account
  @Patch('/terminate')
  closeUserAccount(@GetUser() user: User) {
    //* This is a sticky one.
    //* Ideally, we want to scramble any personal data while retaining useful information
    //* Such as user recipes, anonymous demographics, etc.
    // return this.usersService.deleteUserAccountById(id);
  }
}
