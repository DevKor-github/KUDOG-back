import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, CategoryPerUser } from 'src/entities';
import { In, Repository } from 'typeorm';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(CategoryPerUser)
    private readonly categoryPerUserRepository: Repository<CategoryPerUser>,
  ) {}

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
        return { user: { id: userId }, category: { id } };
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
        user: { id: userId },
        category: { id: In(categoryIds) },
      });
    } catch (err) {
      throw new BadRequestException('invalid category id');
    }
  }
}
