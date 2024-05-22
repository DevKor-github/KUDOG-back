import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/entities';

export class CategoryListResponseDto {
  @ApiProperty({
    description: '카테고리 id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '카테고리 이름',
    example: '학사일정',
  })
  name: string;

  constructor(category: CategoryEntity) {
    this.id = category.id;
    this.name = category.name;
  }
}
