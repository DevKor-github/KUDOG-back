import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class NoticeFilterRequestDto {
  @ApiProperty({ description: '카테고리 목록', example: '공지사항' })
  @IsString({ message: '카테고리는 문자열이어야 합니다.' })
  @IsOptional()
  categories?: string;

  @ApiProperty({ description: 'Provider 목록', example: '정보대학,미디어학부' })
  @IsString({ message: 'Provider는 문자열이어야 합니다.' })
  @IsOptional()
  providers?: string;

  @ApiProperty({ description: '조회 시작 기간', example: '2020-01-01' })
  @IsDateString(
    {},
    { message: '시작 날짜는 YYYY-MM-DD 날짜 형식이어야 합니다.' },
  )
  @IsOptional()
  start_date?: string;

  @ApiProperty({ description: '조회 종료 기간', example: '2020-01-01' })
  @IsDateString(
    {},
    { message: '종료 날짜는 YYYY-MM-DD 날짜 형식이어야 합니다.' },
  )
  @IsOptional()
  end_date?: string;
}
