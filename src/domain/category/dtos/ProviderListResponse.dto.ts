import { ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'src/entities';
import { CategoryListResponseDto } from './categoryListResponse.dto';

export class ProviderListResponseDto {
  @ApiProperty({
    description: '학부 id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '학부 이름',
    example: '정보대학',
  })
  name: string;

  @ApiProperty({
    description: '학부에 속한 카테고리 정보',
    type: [CategoryListResponseDto],
  })
  categories: CategoryListResponseDto[];

  constructor(provider: ProviderEntity) {
    this.id = provider.id;
    this.name = provider.name;
    this.categories = provider.categories.map(
      (category) => new CategoryListResponseDto(category),
    );
  }
}
