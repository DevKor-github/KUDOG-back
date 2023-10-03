import { Body, Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import Category from 'src/entities/category.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('카테고리 api')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/List')
  @ApiOperation({ summary: 'List 조회 api', description: 'list 반환' })
  @ApiResponse({ description: '리스트 전체 반환' })
  async getList() {
    try {
      return this.categoryService.getList();
    } catch (err) {
      console.log(err);
    }
  }
  // TODO: category List get api
  // SWAGGER 작성 - status code, data 형식 명시

  // TODO: 유저 카테고리 구독 POST api
  // SWAGGER 작성 - status code, data 형식
}
