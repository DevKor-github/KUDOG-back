import { ApiProperty } from '@nestjs/swagger';
import { Notice, ScrapBoxEntity } from 'src/entities';

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

  @ApiProperty({
    description: '카테고리 정보',
    example: '학사일정',
  })
  category: string;

  @ApiProperty({ description: '학과 정보', example: '컴퓨터학과' })
  provider: string;

  @ApiProperty({
    description: '공지 사항이 포함된 스크랩박스들의 id',
    example: [1, 2, 3],
  })
  scrapBoxId: number[];

  constructor(entity: Notice, scrapBoxes: ScrapBoxEntity[] = []) {
    const scrapBoxIds = scrapBoxes
      .filter((scrapBox) =>
        scrapBox.scraps.some((scrap) => scrap.noticeId === entity.id),
      )
      .map((scrapBox) => scrapBox.id);

    this.id = entity.id;
    this.title = entity.title;
    this.scrapped = scrapBoxIds.length > 0;
    this.date = entity.date;
    this.provider = entity.category.provider.name;
    this.category = entity.category.name;
    this.scrapBoxId = scrapBoxIds;
  }
}
