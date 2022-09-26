import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import express = require("express");
import { AppModule } from './app.module';
import { initializeConfig } from './config/config';
import { IConfig } from './config/config.interface';
import http = require("http");
import { librarianDataSource } from './data.source';
import { ParamTypeIdPipe } from './pipes/param.type.id.pipe';

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
  console.log('Memory Limit (MB): ', process.env.GAE_MEMORY_MB);

  // const config: IConfig = await initializeConfig();
  // const server = express();

  const app = await NestFactory.create<NestExpressApplication>(AppModule
  //   , {
  //   cors: {
  //     origin: corsBuilder(config.corsOrigin, true),
  //     credentials: true,
  //   },
  //   bodyParser: false,
  //   logger: console,
  // }
  );
  app.useGlobalPipes(new ParamTypeIdPipe());

  librarianDataSource
    .initialize()
    .then(() => {
      console.log('Data source has been initialized');
    })
    .catch((err) => {
      console.error('Error initializing data source', err);
    });


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
  console.log("Server initialized and waiting for requests");

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
