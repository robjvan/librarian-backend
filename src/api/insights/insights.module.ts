import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Book } from 'src/common/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [InsightsService],
  controllers: [InsightsController],
})
export class InsightsModule {}
