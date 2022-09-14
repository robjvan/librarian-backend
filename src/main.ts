import { NestFactory } from '@nestjs/core';
import express from 'express';
import { AppModule } from './app.module';
import { initializeConfig } from './config/config';
import { IConfig } from './config/config.interface';

console.log('Preparing app');

const corsBuilder = (whitelist: null | string | string[], logging = false) => {
  return (
    requestOrigin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (whitelist == null || requestOrigin == null) {
      if (logging && requestOrigin != null) {
        console.log(`CORS (${requestOrigin}) Passed`);
      }
      return callback(null, true);
    } else if (Array.isArray(whitelist)) {
      const containsOrigin = whitelist.includes(requestOrigin);
      if (logging) {
        console.log(
          `CORS (${requestOrigin}) ${containsOrigin ? 'Passed' : 'Failed'}`,
        );
      }
      return callback(null, containsOrigin);
    } else {
      const isOrigin = whitelist == requestOrigin;
      if (logging) {
        console.log(
          `CORS (${requestOrigin}) ${isOrigin ? 'Passed' : 'Failed'}`,
        );
      }
      return callback(null, isOrigin);
    }
  };
};

async function bootstrap() {
  // console.log('Memory Limit (MB): ', process.env.GAE_MEMORY_MB);

  const config: IConfig = await initializeConfig();
  const server = express();

  const app = await NestFactory.create(AppModule, server, {
    cors: {
      origin: corsBuilder(config.corsOrigin, true),
      credentials: true,
    },
    bodyParser: false,
    logger: console,
  });
  await app.listen(3000);
}
bootstrap();
