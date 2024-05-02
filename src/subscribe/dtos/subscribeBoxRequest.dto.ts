import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
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

  @ApiProperty({
    description: '이메일 전송 시간 HH:MM 으로 보내주세요, 5분단위로만..',
    example: '18:00',
  })
  @IsNotEmpty({ message: '이메일 전송 시간은 필수 항목입니다.' })
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5][05])$/, {
    message: '시간은 HH:MM 형식이어야 하며, MM은 5분 단위여야 합니다.',
  })
  sendTime: string;
}
