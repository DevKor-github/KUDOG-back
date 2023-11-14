import { Module } from '@nestjs/common';
import { FetchService } from './fetch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Notice, Provider } from 'src/entities';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  providers: [FetchService, ChannelService],
  imports: [TypeOrmModule.forFeature([Notice, Provider, Category])],
})
export class FetchModule {}
