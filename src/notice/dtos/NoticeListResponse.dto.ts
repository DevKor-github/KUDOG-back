import { ApiProperty } from '@nestjs/swagger';
import { Notice, ScrapBox } from 'src/entities';

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
    description: '전처리된 카테고리 정보',
    example: '학사일정',
  })
  mappedCategory: string;

  @ApiProperty({ description: '학과 정보', example: '컴퓨터학과' })
  provider: string;

  @ApiProperty({
    description: '공지 사항이 포함된 스크랩박스들의 id',
    example: [1, 2, 3],
  })
  scrapBoxId: number[];

  static entityToDto(
    entity: Notice,
    scrapBoxes: ScrapBox[],
  ): NoticeListResponseDto {
    const scrapBoxIds = scrapBoxes
      ? scrapBoxes
          .filter((scrapBox) =>
            scrapBox.scraps.some((scrap) => scrap.noticeId === entity.id),
          )
          .map((scrapBox) => scrapBox.id)
      : [];
    return {
      id: entity.id,
      title: entity.title,
      scrapped: scrapBoxIds.length > 0,
      date: entity.date,
      provider: entity.category.provider.name,
      mappedCategory: entity.category.mappedCategory,
      scrapBoxId: scrapBoxIds,
    };
  }
}

export class PagedNoticeListDto {
  @ApiProperty({
    description: '공지사항 리스트',
    type: [NoticeListResponseDto],
  })
  notices: NoticeListResponseDto[];

  @ApiProperty({ description: '현재 페이지' })
  page: number;

  @ApiProperty({ description: '총 페이지 수' })
  totalPage: number;

  @ApiProperty({ description: '총 공지사항 수' })
  totalNotice: number;
}
