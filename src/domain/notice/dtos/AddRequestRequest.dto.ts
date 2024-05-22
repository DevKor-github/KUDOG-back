import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddRequestRequestDto {
  @ApiProperty({
    description: '메세지',
    example: '컴과 대학원 공지사항 추가해주세요~',
  })
  @IsString({ message: '메시지는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '메시지는 필수 항목입니다.' })
  message: string;
}
