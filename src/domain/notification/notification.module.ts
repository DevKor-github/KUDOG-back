import { ChannelService } from '@/domain/channel/channel.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryPerSubscribeBoxEntity,
  Notice,
  NotificationEntity,
  NotificationTokenEntity,
} from 'src/entities';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notice,
      NotificationEntity,
      NotificationTokenEntity,
      CategoryPerSubscribeBoxEntity,
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, ChannelService],
  exports: [NotificationService],
})
export class NotificationModule {}
