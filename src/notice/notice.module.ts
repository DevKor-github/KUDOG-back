import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice, ScrapEntity, ScrapBoxEntity } from 'src/entities';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  providers: [NoticeService, ChannelService],
  controllers: [NoticeController],
  imports: [TypeOrmModule.forFeature([Notice, ScrapEntity, ScrapBoxEntity])],
})
export class NoticeModule {}
