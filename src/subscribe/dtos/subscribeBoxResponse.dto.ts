import { ApiProperty } from '@nestjs/swagger';
import { SubscribeBoxEntity } from 'src/entities';

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

  @ApiProperty({
    description: '이메일 전송 시간 HH:MM ',
    example: '18:00',
  })
  sendTime: string;

  constructor(entity: SubscribeBoxEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.mail;
    this.provider =
      entity.categories.length > 0
        ? entity.categories[0].category.provider.name
        : '구독하는 공지사항이 없습니다.';
    this.categories = entity.categories.map(
      (category) => category.category.name,
    );
    this.sendTime = entity.sendTime;
  }
}
