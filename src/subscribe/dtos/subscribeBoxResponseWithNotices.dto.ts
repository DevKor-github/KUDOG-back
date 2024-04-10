import { NoticeListResponseDto } from 'src/notice/dtos/NoticeListResponse.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Notice, ScrapBox, SubscribeBox } from 'src/entities';
import { SubscribeBoxResponseDto } from './subscribeBoxResponse.dto';

export class SubscribeBoxResponseDtoWithNotices extends SubscribeBoxResponseDto {
  @ApiProperty({
    description: '구독함에 포함된 공지사항들',
  })
  notices: NoticeListResponseDto[];

  static toDto(
    entity: SubscribeBox,
    notices: Notice[],
    scrapBoxes: ScrapBox[],
  ): SubscribeBoxResponseDtoWithNotices {
    return {
      ...super.entityToDto(entity),
      notices: notices.map((notice) => {
        return NoticeListResponseDto.entityToDto(notice, scrapBoxes);
      }),
    };
  }
}
