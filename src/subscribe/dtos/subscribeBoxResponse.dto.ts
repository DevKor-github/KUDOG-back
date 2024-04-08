import { ApiProperty } from '@nestjs/swagger';
import {
  Category,
  CategoryPerSubscribeBoxEntity,
  Provider,
  ScrapBox,
  SubscribeBox,
} from 'src/entities';
import { SubscribeBoxRequestDto } from './subscribeBoxRequest.dto';

export class SubscribeBoxResponseDto {
  @ApiProperty({
    description: '구독함 id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '구독함 이름',
    example: '내 구독함',
  })
  name: string;

  @ApiProperty({
    description: '구독한 이메일 주소',
    example: 'example@korea.ac.kr',
  })
  email: string;

  @ApiProperty({ description: '구독한 학과', example: '정보대학' })
  provider: string;

  @ApiProperty({
    description: '구독한 카테고리 목록 (not mapped)',
    example: '["학부 공지사항", "진로정보 - 인턴"]',
  })
  categories: string[];

  static entityToDto(entity: SubscribeBox): SubscribeBoxResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.mail,
      provider: entity.categories[0].category.provider.name,
      categories: entity.categories.map((category) => {
        return category.category.name;
      }),
    };
  }
}
