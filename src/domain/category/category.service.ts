import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity, ProviderBookmark, ProviderEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { ProviderListResponseDto } from './dtos/ProviderListResponse.dto';
import { CategoryListResponseDto } from './dtos/categoryListResponse.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
    @InjectRepository(ProviderBookmark)
    private readonly providerBookmarkRepository: Repository<ProviderBookmark>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getProviders(): Promise<ProviderListResponseDto[]> {
    const providers = await this.providerRepository.find({
      relations: ['categories'],
    });

    return providers.map((provider) => new ProviderListResponseDto(provider));
  }

  async getCategories(id: number): Promise<CategoryListResponseDto[]> {
    const categories = await this.categoryRepository.find({
      where: { provider: { id } },
    });

    return categories.map((category) => new CategoryListResponseDto(category));
  }

  async getBookmarkedProviders(
    userId: number,
  ): Promise<ProviderListResponseDto[]> {
    const bookmarks = await this.providerBookmarkRepository.find({
      where: { user: { id: userId } },
      relations: ['provider', 'provider.categories'],
    });

    return bookmarks.map(
      (bookmark) => new ProviderListResponseDto(bookmark.provider),
    );
  }
}
