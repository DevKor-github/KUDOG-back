//사용자 정보 & 카테고리 ID 목록을 받아서 구독 정보를 저장

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryPerUser from 'src/entities/categoryPerUser.entity';
import Category from 'src/entities/category.entity';
import User from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';

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

  //사용자 ID와 구독하려는 카테고리 ID 목록 받기 (하나의 사용자가 여러 카테고리를 동시에 구독)

  async subscribe(userId: number, categoryId: number[]) {
    const finduser = await this.userRepository.findOne({ where: { userId } }); // findOne()은 documents 객체 하나를 반환한다.

    if (!finduser) {
      throw new Error('User not found');
    }

    const findcategory = await this.categoryRepository.find({
      where: { categoryId: In(categoryId) },
    }); // find()는 documents의 리스트를 반환, In 연산자는 배열 내의 여러 값과 일치하는 항목을 검색할 때 사용.

    if (!findcategory) {
      throw new Error('category not found');
    }

    const CategoryPerUser = categoryId.map((category) => {
      const categoryPerUser = new CategoryPerUser(); //CategoryPerUser entitiy의 ID를 생성
      categoryPerUser.user = userId;
      categoryPerUser.category = categoryId;
      return categoryPerUser;
    });

    await this.categoryPerUserRepository.save(CategoryPerUser);
  }
}
