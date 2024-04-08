import { ApiProperty } from '@nestjs/swagger';

export class SubscribeBoxRequestDto {
  @ApiProperty({
    description: '구독함 이름',
    example: '내 구독함',
  })
  name: string;

  @ApiProperty({
    description: '메일 받을 이메일 주소',
    example: 'example@korea.ac.kr',
  })
  email: string;

  @ApiProperty({ description: '구독할 학과', example: '정보대학' })
  provider: string;

  @ApiProperty({
    description: '구독할 카테고리 목록 (not mapped)',
    example: '["학부 공지사항", "진로정보 - 인턴"]',
  })
  categories: string[];
}
