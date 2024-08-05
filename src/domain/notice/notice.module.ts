import { ChannelService } from '@/domain/channel/channel.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice, ScrapBoxEntity, ScrapEntity } from 'src/entities';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  providers: [NoticeService, ChannelService],
  controllers: [NoticeController],
  imports: [TypeOrmModule.forFeature([Notice, ScrapEntity, ScrapBoxEntity])],
})
export class NoticeModule {}
