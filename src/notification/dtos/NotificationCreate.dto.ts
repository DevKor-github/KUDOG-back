//reponse dto
import { ApiProperty } from '@nestjs/swagger';

export class NotificationCreateDto {
  @ApiProperty({ description: 'notification의 ID', example: 1 })
  title: string;

  @ApiProperty({
    description: 'notification의 내용',
    examples: ['구독함에 새로운 공지가 올라왔어요', '정보대학'], //맞는 예시로 수정이 필요해요.
  })
  body: string;

  @ApiProperty({
    description: 'notification의 생성 일자',
    example: '2024-04-09T12:00:00.000Z',
  })
  date: Date;

  @ApiProperty({ description: 'user의 이름', example: '김OO' })
  createdBy: string;
}
