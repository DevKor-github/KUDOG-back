// 컨트롤러와 서비스를 연결
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import User from 'src/entities/user.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ConfigModule } from '@nestjs/config';
import CategoryPerUser from 'src/entities/categoryPerUser.entity';
import { ApiTags } from '@nestjs/swagger';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, CategoryPerUser])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
@ApiTags('categories')
export class CategoryModule {}
