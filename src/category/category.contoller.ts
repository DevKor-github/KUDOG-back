import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // TODO: category List get api
  // SWAGGER 작성 - status code, data 형식 명시

  // TODO: 유저 카테고리 구독 POST api
  // SWAGGER 작성 - status code, data 형식 명시
}
