import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

console.log('Preparing app');

async function bootstrap() {
  const logger = new Logger('main.ts');
  
  /// Create the app
  const app: NestExpressApplication = await NestFactory.create(
    AppModule,
  );
  
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  /// Add middleware
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors();

  /// Launch the server
  await app.listen(port, () => {
    logger.log(`Server initialized and waiting for requests`);
    logger.debug(`[WEB] ${config.get<string>('BASE_URL')}`);
  });
}
bootstrap();
