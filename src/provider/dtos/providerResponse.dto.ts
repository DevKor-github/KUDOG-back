//dto는 provider을 만들기위해서 필요한 entity의 필드들을 정리.

import { ApiProperty } from '@nestjs/swagger';

export class providerResponseDto {
  @ApiProperty({ description: 'provider의 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '공지사항이 올라가있는 페이지',
    examples: ['KUPID', '정보대학', '디자인 조형학부'],
  })
  name: string;
}
