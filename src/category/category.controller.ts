import { Controller, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/subscribe/:userId')
  @ApiResponse({ description: 'subscribe' })
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
