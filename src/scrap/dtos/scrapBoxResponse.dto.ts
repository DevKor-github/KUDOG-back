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

  static entityToDto(entity: ScrapBox): ScrapBoxResponseDto {
    return {
      noticeCount: entity.scraps ? entity.scraps.length : 0,
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }
}
