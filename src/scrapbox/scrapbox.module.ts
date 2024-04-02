import { Module } from '@nestjs/common';
import { ScrapboxService } from './scrapbox.service';
import { ScrapboxController } from './scrapbox.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Notice, Provider, Scrap, ScrapBox } from 'src/entities';

@Module({
  providers: [ScrapboxService],
  controllers: [ScrapboxController],
  imports: [
    TypeOrmModule.forFeature([Notice, Provider, Category, Scrap, ScrapBox]),
  ],
})
export class ScrapBoxModule {}
