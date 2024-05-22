import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ScrapBoxRequestDto {
  @ApiProperty({
    description: '스크랩박스의 이름',
    example: '내 스크랩박스',
  })
  @IsNotEmpty({ message: '스크랩박스의 이름은 필수 항목입니다.' })
  @IsString({ message: '스크랩박스의 이름은 문자열이어야 합니다.' })
  name: string;

  @ApiProperty({
    description: '스크랩박스의 설명',
    example: '장학금 정보 스크랩박스',
  })
  @IsNotEmpty({ message: '스크랩박스의 설명은 필수 항목입니다.' })
  @IsString({ message: '스크랩박스의 설명은 문자열이어야 합니다.' })
  description: string;
}
