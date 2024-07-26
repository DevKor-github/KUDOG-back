import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from './pageQuery';

export class PageResponse<T> {
  @ApiProperty({ description: '데이터 목록', type: [Object] })
  records: T[];
  @ApiProperty({ description: '현재 페이지', example: 1 })
  page: number;
  @ApiProperty({ description: '전체 페이지 수', example: 10 })
  totalPage: number;
  @ApiProperty({ description: '전체 데이터 수', example: 100 })
  totalRecords: number;
  @ApiProperty({ description: '한 페이지당 데이터 수', example: 10 })
  pageSize: number;

  constructor(records: T[], totalRecords: number, pageQuery: PageQuery) {
    this.records = records;
    this.page = pageQuery.page;
    this.pageSize = pageQuery.pageSize;
    this.totalPage = Math.ceil(totalRecords / pageQuery.pageSize);
    this.totalRecords = totalRecords;
  }
}
