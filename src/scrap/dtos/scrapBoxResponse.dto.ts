import { ApiProperty } from '@nestjs/swagger';
import { ScrapBoxRequestDto } from './scrapBoxRequest.dto';
import { ScrapBox } from 'src/entities';

export class ScrapBoxResponseDto extends ScrapBoxRequestDto {
  @ApiProperty({
    description: '스크랩박스의 id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '게시물 개수',
    example: 20,
  })
  noticeCount: number;

  constructor(entity: ScrapBox) {
    super();
    this.noticeCount = entity.scraps ? entity.scraps.length : 0;
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
  }
}
