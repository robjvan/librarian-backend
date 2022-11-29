import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

@Injectable()
export class TypeOrmProdConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get<string>('DB_HOST'),
      port: parseInt(this.config.get<string>('DB_PORT')),
      database: this.config.get<string>('DB_NAME'),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASS'),
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
      // entities: [Book, User, UserSubscription, Location],
      migrations: [__dirname + '/../**/*.migration.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: false, //! TODO: NEVER use true in production!!!
      
    };
  }
}
