import { Controller, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  // TODO: category List get api
  // SWAGGER 작성 - status code, data 형식 명시

  // TODO: 유저 카테고리 구독 POST api
  // SWAGGER 작성 - status code, data 형식 명시
}

@Controller('users')
export class UserController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':userId/subscribe')
  async subscribelist(
    @Param('userId') userId: number,
    @Body() body: { categoryId: number[] },
  ) {
    const { categoryId } = body;
    await this.categoryService.subscribe(userId, categoryId);
    return 'Subscribed to category';
  }
}

/*userid는 동적으로 할당되며, categoyid는 기존에 있던 본문(body)
에서 할당된다*/
