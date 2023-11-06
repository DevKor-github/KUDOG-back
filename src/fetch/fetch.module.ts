import { Module } from '@nestjs/common';
import { FetchService } from './fetch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Notice, Provider } from 'src/entities';

@Module({
  providers: [FetchService],
  imports: [TypeOrmModule.forFeature([Notice, Provider, Category])],
})
export class FetchModule {}
