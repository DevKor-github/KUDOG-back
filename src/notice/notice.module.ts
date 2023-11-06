import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Notice, Provider } from 'src/entities';

@Module({
  providers: [NoticeService],
  controllers: [NoticeController],
  imports: [TypeOrmModule.forFeature([Notice, Provider, Category])],
})
export class NoticeModule {}
