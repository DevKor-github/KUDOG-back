import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CategoryRequestDto {
  @ApiProperty({ description: '구독할 카테고리 목록', example: [1, 2] })
  @IsArray()
  subscribeIds: number[];

  @ApiProperty({ description: '구독 취소할 카테고리 목록', example: [3, 4] })
  @IsArray()
  unsubscribeIds: number[];
}
