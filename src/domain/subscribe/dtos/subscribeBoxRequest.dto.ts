import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SubscribeBoxRequestDto {
  @ApiProperty({
    description: '구독함 이름',
    example: '내 구독함',
  })
  @IsNotEmpty({ message: '구독함 이름은 필수 항목입니다.' })
  @IsString({ message: '구독함 이름은 문자열이어야 합니다.' })
  name: string;

  @ApiProperty({
    description: '메일 받을 이메일 주소',
    example: 'example@korea.ac.kr',
  })
  @IsEmail({}, { message: '유효하지 않은 이메일 주소입니다.' })
  @IsNotEmpty({ message: '이메일 주소는 필수 항목입니다.' })
  email: string;

  @ApiProperty({ description: '구독할 학과', example: '정보대학' })
  @IsNotEmpty({ message: '구독할 학과는 필수 항목입니다.' })
  @IsString({ message: '구독할 학과는 문자열이어야 합니다.' })
  provider: string;

  @ApiProperty({
    description: '구독할 카테고리 목록 (not mapped)',
    example: '["학부 공지사항", "진로정보 - 인턴"]',
  })
  @IsArray({ message: '카테고리 목록은 배열이어야 합니다.' })
  @ArrayNotEmpty({
    message: '카테고리 목록은 적어도 하나의 요소를 포함해야 합니다.',
  })
  @IsString({
    each: true,
    message: '카테고리 목록의 모든 항목은 문자열이어야 합니다.',
  })
  categories: string[];
}
