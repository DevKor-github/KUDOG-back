import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { ProviderListResponseDto } from './dtos/ProviderListResponse.dto';
import { CategoryListResponseDto } from './dtos/categoryListResponse.dto';
@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getProviders(): Promise<ProviderListResponseDto[]> {
    const providers =
      await this.categoryRepository.getProvidersJoinCategories();

    return providers.map((provider) => new ProviderListResponseDto(provider));
  }

  async getCategories(providerId: number): Promise<CategoryListResponseDto[]> {
    const categories =
      await this.categoryRepository.getCategoriesByProviderId(providerId);

    return categories.map((category) => new CategoryListResponseDto(category));
  }

  async getBookmarkedProviders(
    userId: number,
  ): Promise<ProviderListResponseDto[]> {
    const bookmarks =
      await this.categoryRepository.getBookmarkedProvidersJoinCategories(
        userId,
      );

    return bookmarks.map(
      (bookmark) => new ProviderListResponseDto(bookmark.provider),
    );
  }
}
