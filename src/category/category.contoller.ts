import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
} from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/:id/categories')
  async getcategories(@Param('id') providerId: number) {
    try {
      return await this.categoryService.findById(providerId);
    } catch (err) {
      return err;
    }
  }
}
