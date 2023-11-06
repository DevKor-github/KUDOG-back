import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryPerUser, Category, KudogUser } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(CategoryPerUser)
    private readonly categoryPerUserRepository: Repository<CategoryPerUser>,
    @InjectRepository(KudogUser)
    private readonly userRepository: Repository<KudogUser>,
  ) {}
}
