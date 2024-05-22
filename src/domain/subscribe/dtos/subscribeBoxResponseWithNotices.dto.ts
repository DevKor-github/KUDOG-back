import { NoticeListResponseDto } from 'src/domain/notice/dtos/NoticeListResponse.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Notice, ScrapBoxEntity, SubscribeBoxEntity } from 'src/entities';
import { SubscribeBoxResponseDto } from './subscribeBoxResponse.dto';

export class SubscribeBoxResponseDtoWithNotices extends SubscribeBoxResponseDto {
  @ApiProperty({
    description: '구독함에 포함된 공지사항들',
  })
  notices: NoticeListResponseDto[];

  constructor(
    entity: SubscribeBoxEntity,
    notices: Notice[],
    scrapBoxes: ScrapBoxEntity[],
  ) {
    super(entity);
    this.notices = notices.map(
      (notice) => new NoticeListResponseDto(notice, scrapBoxes),
    );
  }
}
