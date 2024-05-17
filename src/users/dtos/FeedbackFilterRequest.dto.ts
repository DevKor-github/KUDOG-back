import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FeedbackDto {
  @ApiProperty({
    description: '사용자가 보내는 피드백 메세지',
    example: '쿠독 좋아요~',
  })
  @IsString({ message: '피드백은 문자열이어야 합니다' })
  feedback?: string;
}
