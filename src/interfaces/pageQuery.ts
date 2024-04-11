import { ApiProperty } from '@nestjs/swagger';

export class PageQuery {
  @ApiProperty({ description: '페이지 번호', default: 1, example: 1 })
  page: number;

  @ApiProperty({
    description: '한 페이지당 record 수',
    example: 10,
    default: 10,
  })
  pageSize: number;
}
