import { Module } from '@nestjs/common';
import { FetchService } from './fetch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryEntity,
  KudogUser,
  Notice,
  ProviderEntity,
} from 'src/entities';
import { ChannelService } from 'src/channel/channel.service';
import { MailModule } from 'src/mail/mail.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  providers: [FetchService, ChannelService],
  imports: [
    TypeOrmModule.forFeature([
      Notice,
      ProviderEntity,
      CategoryEntity,
      KudogUser,
    ]),
    MailModule,
    NotificationModule,
  ],
})
export class FetchModule {}
