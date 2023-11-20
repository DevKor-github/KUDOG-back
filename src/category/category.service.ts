import {
  BadRequestException,
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
    const categories = await this.categoryRepository.findOne({
      where: { provider: { id: providerId } },
      relations: ['provider'],
    });
    if (!categories)
      throw new NotFoundException('provider가 존재하지 않습니다.');
  }

  async subscribeCategories(userId: number, categoryIds: number[]) {
    try {
      const categoryPerUsers: CategoryPerUser[] = [];
      await Promise.all(
        categoryIds.map(async (categoryId) => {
          const categoryPerUser = this.categoryPerUserRepository.create({
            user: { id: userId },
            category: { id: categoryId },
          });
          categoryPerUsers.push(categoryPerUser);
        }),
      );
      await this.categoryPerUserRepository.save(categoryPerUsers);
    } catch (err) {
      throw new BadRequestException('invalid category id');
    }
  }

  async deleteCategories(userId: number, categoryIds: number[]) {
    try {
      const categoryPerUsers = await this.categoryPerUserRepository.find({
        where: { user: { id: userId }, category: { id: In(categoryIds) } },
      });
      await this.categoryPerUserRepository.remove(categoryPerUsers);
    } catch (err) {
      throw new BadRequestException('invalid category id');
    }
  }
}
