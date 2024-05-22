import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import {
  CategoryEntity,
  CategoryPerSubscribeBoxEntity,
  Notice,
  ScrapBoxEntity,
  SubscribeBoxEntity,
} from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeController } from './subscribe.controller';

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService],

  imports: [
    TypeOrmModule.forFeature([
      SubscribeBoxEntity,
      CategoryEntity,
      Notice,
      ScrapBoxEntity,
      CategoryPerSubscribeBoxEntity,
    ]),
  ],
})
export class SubscribeModule {}
