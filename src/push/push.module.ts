import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { FcmToken } from 'src/entities/fcmtoken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KudogUser } from 'src/entities';
@Module({
  providers: [PushService],
  controllers: [PushController],
  imports: [TypeOrmModule.forFeature([FcmToken])],
})
export class PushModule {}
