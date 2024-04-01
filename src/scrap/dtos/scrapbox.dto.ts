import { ApiProperty } from '@nestjs/swagger';

export class ScrapBoxDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: '스크랩박스의 이름',
    example: '내 스크랩박스',
  })
  boxName: string;
}
