import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PageQuery {
  @ApiProperty({ description: '페이지 번호', default: 1, example: 1 })
  @IsNumber({}, { message: 'page는 숫자여야 합니다.' })
  page: number;

  @ApiProperty({
    description: '한 페이지당 record 수',
    example: 10,
    default: 10,
  })
  @IsNumber({}, { message: 'page는 숫자여야 합니다.' })
  pageSize: number;
}
