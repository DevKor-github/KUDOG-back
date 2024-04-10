import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import {
  Category,
  CategoryPerSubscribeBoxEntity,
  Notice,
  ScrapBox,
  SubscribeBox,
} from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeController } from './subscribe.controller';

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService],

  imports: [
    TypeOrmModule.forFeature([
      SubscribeBox,
      Category,
      Notice,
      ScrapBox,
      CategoryPerSubscribeBoxEntity,
    ]),
  ],
})
export class SubscribeModule {}
