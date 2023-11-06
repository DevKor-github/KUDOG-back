import { ApiProperty } from '@nestjs/swagger';

export class NoticeListResponseDto {
  @ApiProperty({ description: '공지사항 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '공지사항 제목',
    example: '2023학년도 제1학기 복수전공 면접',
  })
  title: string;

  @ApiProperty({ description: 'scrap 여부', example: false })
  scrapped: boolean;

  @ApiProperty({ description: '공지사항 작성일', example: '2023-11-07' })
  date: string;
}
