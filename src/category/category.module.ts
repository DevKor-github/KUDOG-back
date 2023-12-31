import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, CategoryPerUser } from 'src/entities';
import { CategoryController } from './category.contoller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryPerUser])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
