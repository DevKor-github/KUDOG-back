import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryPerUser from 'src/entities/categoryPerUser.entity';
import Category from 'src/entities/category.entity';
import User from 'src/entities/user.entity';
import { CategoryController } from './category.contoller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, CategoryPerUser])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
