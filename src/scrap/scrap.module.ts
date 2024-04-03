import { Module } from '@nestjs/common';
import { ScrapService } from './scrap.service';
import { ScrapController } from './scrap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KudogUser, ScrapBox } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapBox, KudogUser])],
  providers: [ScrapService],
  controllers: [ScrapController],
})
export class ScrapModule {}
