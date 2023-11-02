import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPerUser, Category, UserEntity } from 'src/entities';
import { CategoryController } from './category.contoller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, Category, CategoryPerUser])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
