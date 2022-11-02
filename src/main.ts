import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
// import { librarianDataSource } from './data.source';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

console.log('Preparing app');

// const corsBuilder = (whitelist: null | string | string[], logging = false) => {
//   return (
//     requestOrigin: string,
//     callback: (err: Error | null, allow?: boolean) => void,
//   ) => {
//     if (whitelist == null || requestOrigin == null) {
//       if (logging && requestOrigin != null) {
//         console.log(`CORS (${requestOrigin}) Passed`);
//       }
//       return callback(null, true);
//     } else if (Array.isArray(whitelist)) {
//       const containsOrigin = whitelist.includes(requestOrigin);
//       if (logging) {
//         console.log(
//           `CORS (${requestOrigin}) ${containsOrigin ? 'Passed' : 'Failed'}`,
//         );
//       }
//       return callback(null, containsOrigin);
//     } else {
//       const isOrigin = whitelist == requestOrigin;
//       if (logging) {
//         console.log(
//           `CORS (${requestOrigin}) ${isOrigin ? 'Passed' : 'Failed'}`,
//         );
//       }
//       return callback(null, isOrigin);
//     }
//   };
// };

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(
    AppModule,
    //   , {
    //   cors: {
    //     origin: corsBuilder(config.corsOrigin, true),
    //     credentials: true,
    //   },
    //   bodyParser: false,
    //   logger: console,
    // }
  );
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  // console.log('Memory Limit (MB): ', process.env.GAE_MEMORY_MB);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // app.use(helmet());
  // app.use(cookieParser());
  // app.use(
  //   bodyParser.urlencoded({
  //     verify: rawBodyBuffer,
  //     extended: true,
  //     limit: "500kb",
  //   })
  // );
  // app.use(bodyParser.json({ verify: rawBodyBuffer, limit: "500kb" }));
  // app.use((req, res, next) => {
  //   res.set("Cache-Control", "no-store");
  //   res.set("Pragma", "no-cache");
  //   res.set("Allow-Origin-With-Credentials", true);
  //   next();
  // });
  // app.set("trust proxy", true);

  // app.useGlobalFilters(new OwnershipExceptionFilter());

  // await app.init();
  // http.createServer(server).listen(config.httpPort || 3000);

  await app.listen(port, () => {
    Logger.log(`Server initialized and waiting for requests`);
    Logger.debug('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
