import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryPerSubscribeBoxEntity,
  NotificationTokenEntity,
  NotificationEntity,
} from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationEntity,
      NotificationTokenEntity,
      CategoryPerSubscribeBoxEntity,
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
