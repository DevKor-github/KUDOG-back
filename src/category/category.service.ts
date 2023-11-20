import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, CategoryPerUser } from 'src/entities';
import { Repository } from 'typeorm';
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
}
