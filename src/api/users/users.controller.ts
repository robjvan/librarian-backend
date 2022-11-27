import { Controller, Get, Patch, Body, Logger, HttpCode, Post } from "@nestjs/common";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { User } from "src/common/entities/user.entity";
import { UserSubscriptionService } from "./user-subscription.service";
import { UsersService } from "./users.service";

@Controller('api/v1/user')
export class UserController {
  constructor(
    private subscriptionService: UserSubscriptionService,
    private readonly usersService: UsersService,
  ) {}

  //* Used for API actions pertaining to the current user

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
    Logger.debug(user);
    // TODO: Finish this
  }

  // Promote current user to Admin
  @Patch('/promote')
  promoteUserAccount(@GetUser() user: User) {
    return this.usersService.promoteUserAccount(user.id);
  }

  // Close user account
  @Post('/terminate')
  @HttpCode(204)
  closeUserAccount(@GetUser() user: User) {
    Logger.debug(user);
    //* This is a sticky one.
    //* Ideally, we want to scramble any personal data while retaining useful information
    //* such as user books, anonymous demographics, etc.
  }
}
