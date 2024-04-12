import { ApiProperty } from '@nestjs/swagger';

export class AddRequestRequestDto {
  @ApiProperty({
    description: '메세지',
    example: '컴과 대학원 공지사항 추가해주세요~',
  })
  message: string;
}
