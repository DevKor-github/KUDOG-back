import { ApiProperty } from '@nestjs/swagger';

export class ScrapBoxRequestDto {
  @ApiProperty({
    description: '스크랩박스의 이름',
    example: '내 스크랩박스',
  })
  name: string;

  @ApiProperty({
    description: '스크랩박스의 설명',
    example: '장학금 정보 스크랩박스',
  })
  description: string;
}
