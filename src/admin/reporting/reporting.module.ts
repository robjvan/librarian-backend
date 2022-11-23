import { Module } from '@nestjs/common';
import { ReportingController } from './reporting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { Book } from 'src/common/entities/book.entity';
import { ReportingService } from './reporting.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Book]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ReportingService],
  controllers: [ReportingController],
})
export class ReportingModule {}
