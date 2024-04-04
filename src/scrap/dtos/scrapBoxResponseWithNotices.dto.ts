import { NoticeListResponseDto } from 'src/notice/dtos/NoticeListResponse.dto';
import { ScrapBoxResponseDto } from './scrapBoxResponse.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ScrapBox } from 'src/entities';

export class ScrapBoxResponseWithNotices extends ScrapBoxResponseDto {
  @ApiProperty({
    description: '스크랩박스에 포함된 공지사항들',
  })
  notices: NoticeListResponseDto[];

  static toDto(
    entity: ScrapBox,
    others: ScrapBox[],
  ): ScrapBoxResponseWithNotices {
    return {
      ...super.entityToDto(entity),
      notices: entity.scraps.map((scrap) =>
        NoticeListResponseDto.entityToDto(scrap.notice, others),
      ),
    };
  }
}
