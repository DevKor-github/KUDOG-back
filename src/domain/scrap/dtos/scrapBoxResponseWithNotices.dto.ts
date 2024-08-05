import { ApiProperty } from '@nestjs/swagger';
import { NoticeListResponseDto } from 'src/domain/notice/dtos/NoticeListResponse.dto';
import { ScrapBoxEntity } from 'src/entities';
import { ScrapBoxResponseDto } from './scrapBoxResponse.dto';

export class ScrapBoxResponseWithNotices extends ScrapBoxResponseDto {
  @ApiProperty({
    description: '스크랩박스에 포함된 공지사항들',
  })
  notices: NoticeListResponseDto[];

  constructor(entity: ScrapBoxEntity, others: ScrapBoxEntity[]) {
    super(entity);
    this.notices = entity.scraps.map(
      (scrap) => new NoticeListResponseDto(scrap.notice, others),
    );
  }
}
