import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryPerUser from 'src/entities/categoryPerUser.entity';
import Category from 'src/entities/category.entity';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(CategoryPerUser)
    private readonly categoryPerUserRepository: Repository<CategoryPerUser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getList() {
    const categoryList = await this.categoryRepository.find({});
    return categoryList;
  }
}
