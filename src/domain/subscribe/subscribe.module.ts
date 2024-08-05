import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryEntity,
  CategoryPerSubscribeBoxEntity,
  Notice,
  ScrapBoxEntity,
  SubscribeBoxEntity,
} from 'src/entities';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

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
