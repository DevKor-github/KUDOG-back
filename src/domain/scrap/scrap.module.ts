import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapBoxEntity } from 'src/entities';
import { ScrapController } from './scrap.controller';
import { ScrapService } from './scrap.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapBoxEntity])],
  providers: [ScrapService],
  controllers: [ScrapController],
})
export class ScrapModule {}
