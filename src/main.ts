import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
// import { librarianDataSource } from './data.source';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

console.log('Preparing app');


async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(
    AppModule,
  );
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors();

  await app.listen(config.get<number>('PORT'), () => {
    Logger.log(`Server initialized and waiting for requests`);
    Logger.debug('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
