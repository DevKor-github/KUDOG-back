import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /*
  async getSubscribedCategories(userId: number): Promise<CategoryReponseDto[]> {
    const categories = await this.categoryPerUserRepository.find({
      where: { user: { id: userId } },
      relations: ['category', 'category.provider'],
    });

    return categories.map((category) => {
      return {
        id: category.category.id,
        url: category.category.url,
        name: category.category.name,
        provider: category.category.provider,
      };
    });
  }

  async getcategories(providerId: number) {
    const categories = await this.categoryRepository.find({
      where: { provider: { id: providerId } },
      relations: ['provider'],
    });
    if (!categories)
      throw new NotFoundException('provider가 존재하지 않습니다.');

    return categories;
  }

  async subscribeCategories(userId: number, categoryIds: number[]) {
    if (!categoryIds || categoryIds.length === 0) return;
    try {
      const entityOptions = categoryIds.map((id) => {
        return { user_id: userId, category_id: id };
      });
      await this.categoryPerUserRepository.insert(entityOptions);
    } catch (err) {
      throw new ConflictException('invalid category id');
    }
  }

  async deleteCategories(userId: number, categoryIds: number[]) {
    if (!categoryIds || categoryIds.length === 0) return;
    try {
      await this.categoryPerUserRepository.delete({
        user_id: userId,
        category_id: In(categoryIds),
      });
    } catch (err) {
      throw new BadRequestException('invalid category id');
    }
  }
  */
}
