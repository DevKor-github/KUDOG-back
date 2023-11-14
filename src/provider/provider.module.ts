import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Notice, Provider } from 'src/entities';

@Module({
  providers: [ProviderService],
  controllers: [ProviderController],
  imports: [TypeOrmModule.forFeature([Notice, Provider, Category])],
})
export class ProviderModule {}
