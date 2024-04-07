import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KudogUser } from 'src/entities';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([KudogUser]), NotificationModule],
})
export class UsersModule {}
