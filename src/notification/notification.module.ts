import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryPerSubscribeBoxEntity,
  NotificationTokenEntity,
  NotificationEntity,
  Notice,
} from 'src/entities';
import { ChannelService } from 'src/channel/channel.service';

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
