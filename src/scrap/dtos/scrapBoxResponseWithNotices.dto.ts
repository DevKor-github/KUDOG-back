import { NoticeListResponseDto } from 'src/notice/dtos/NoticeListResponse.dto';
import { ScrapBoxResponseDto } from './scrapBoxResponse.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ScrapBox } from 'src/entities';

export class ScrapBoxResponseWithNotices extends ScrapBoxResponseDto {
  @ApiProperty({
    description: '스크랩박스에 포함된 공지사항들',
  })
  notices: NoticeListResponseDto[];

  constructor(entity: ScrapBox, others: ScrapBox[]) {
    super(entity);
    this.notices = entity.scraps.map(
      (scrap) => new NoticeListResponseDto(scrap.notice, others),
    );
  }
}
