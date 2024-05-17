import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KudogUser, SubscribeBoxEntity } from 'src/entities';
import { ChannelModule } from 'src/channel/channel.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([KudogUser,SubscribeBoxEntity]),ChannelModule],
})
export class UsersModule {}
