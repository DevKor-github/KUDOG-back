import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class SendTimeFilterRequestDto {
  @ApiProperty({ description: '새로운 발송 시간', example: '20:00' })
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: '시간은 HH:MM 형식이어야 합니다',
  })
  sendTime?: string;
}
