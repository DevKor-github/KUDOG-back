import { ChannelService } from '@/domain/channel/channel.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/domain/mail/mail.module';
import { NotificationModule } from 'src/domain/notification/notification.module';
import {
  CategoryEntity,
  KudogUserEntity,
  Notice,
  ProviderEntity,
} from 'src/entities';
import { FetchService } from './fetch.service';

@Module({
  providers: [FetchService, ChannelService],
  imports: [
    TypeOrmModule.forFeature([
      Notice,
      ProviderEntity,
      CategoryEntity,
      KudogUserEntity,
    ]),
    MailModule,
    NotificationModule,
  ],
})
export class FetchModule {}
