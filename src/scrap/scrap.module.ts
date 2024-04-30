import { Module } from '@nestjs/common';
import { ScrapService } from './scrap.service';
import { ScrapController } from './scrap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapBoxEntity } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapBoxEntity])],
  providers: [ScrapService],
  controllers: [ScrapController],
})
export class ScrapModule {}
