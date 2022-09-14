import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BooksController } from './endpoints/books/books.controller';
import { UserController } from './endpoints/user/user.controller';
import { MiddlewareConsumer, RouteInfo } from '@nestjs/common/interfaces';

import * as rateLimit from 'express-rate-limit';
import { BooksService } from './endpoints/books/books.service';

@Module({
  imports: [],
  controllers: [AppController, BooksController, UserController],
  providers: [
    BooksService
  ],
})
export class AppModule {
  private readonly _limitedRoutes: RouteInfo[] = [
    // { path: 'api/v1/users/', method: RequestMethod.POST },
    // { path: 'api/v1/users/activate', method: RequestMethod.POST },
    // { path: 'api/v1/users/password/update', method: RequestMethod.ALL },
    // { path: 'api/v1/users/password', method: RequestMethod.ALL },
    // { path: 'api/v1/users/password/reset', method: RequestMethod.ALL },
    // { path: 'api/v1/users/resend', method: RequestMethod.ALL },
    // { path: 'api/v1/users/password/mobile', method: RequestMethod.ALL },
    // { path: 'api/v1/users/password/mobile/reset', method: RequestMethod.ALL },
    // { path: 'api/v1/files/', method: RequestMethod.GET },
  ];

  configure(consumer: MiddlewareConsumer): void {
    // limit standard endpoints to 100 requests per minute
      consumer
        .apply(
          rateLimit({
            windowMS: 1 * 60 * 1000,
            max: 100,
          }),
        )
        .exclude(...this._limitedRoutes)
        .forRoutes('api/*');
    //   // limit restricted endpoints to 1 request per 15 seconds
    //   consumer
    //     .apply(
    //       rateLimit({
    //         windowMs: 15 * 1000,
    //         max: 3,
    //       }),
    //     )
    //     .forRoutes(...this._limitedRoutes);
    // }
  }
}
