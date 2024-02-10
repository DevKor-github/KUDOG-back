import { Module } from '@nestjs/common';
import { FetchService } from './fetch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, KudogUser, Notice, Provider } from 'src/entities';
import { ChannelService } from 'src/channel/channel.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [FetchService, ChannelService],
  imports: [
    TypeOrmModule.forFeature([Notice, Provider, Category, KudogUser]),
    MailModule,
  ],
})
export class FetchModule {}
