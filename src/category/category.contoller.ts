import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { Category } from 'src/entities';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/:id/categories')
  @ApiOperation({
    summary: ' provider id로 해당 category 가져오기 ',
    description: '해당 category 가져옴',
  })
  @ApiCreatedResponse({ description: 'category 반환 ', type: Category })
  async getcategories(@Param('id') providerId: number) {
    try {
      return await this.categoryService.getcategories(providerId);
    } catch (err) {
      return err;
    }
  }
}
