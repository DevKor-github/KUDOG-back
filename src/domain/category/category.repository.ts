import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ProviderEntity } from './entities/provider.entity';
import { ProviderBookmarkEntity } from './entities/providerBookmark.entity';

@Injectable()
export class CategoryRepository {
  private categoryEntityRepository: Repository<CategoryEntity>;
  private providerEntityRepository: Repository<ProviderEntity>;
  private providerBookmarkEntityRepository: Repository<ProviderBookmarkEntity>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.categoryEntityRepository =
      this.dataSource.getRepository(CategoryEntity);
    this.providerEntityRepository =
      this.dataSource.getRepository(ProviderEntity);
    this.providerBookmarkEntityRepository = this.dataSource.getRepository(
      ProviderBookmarkEntity,
    );
  }

  async getProvidersJoinCategories(): Promise<ProviderEntity[]> {
    return this.providerEntityRepository.find({
      relations: ['categories'],
    });
  }

  async getCategoriesByProviderId(
    providerId: number,
  ): Promise<CategoryEntity[]> {
    return this.categoryEntityRepository.find({ where: { providerId } });
  }

  async getBookmarkedProvidersJoinCategories(userId: number) {
    return this.providerBookmarkEntityRepository.find({
      where: { userId },
      relations: ['provider', 'provider.categories'],
    });
  }
}
