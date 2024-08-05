import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { ProviderEntity } from './entities/provider.entity';
import { ProviderBookmarkEntity } from './entities/providerBookmark.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProviderEntity,
      ProviderBookmarkEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
