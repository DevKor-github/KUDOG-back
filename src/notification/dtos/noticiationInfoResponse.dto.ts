import { ApiProperty } from '@nestjs/swagger';
import { Notifications } from 'src/entities';

export class NotificationInfoResponseDto {
  @ApiProperty({
    description: '알림 title',
    example: '공지사항이 등록되었습니다',
  })
  title: string;

  @ApiProperty({
    description: '알림 body',
    example: '구독함에 새로운 공지가 올라왔어요',
  })
  body: string;

  @ApiProperty({
    description: 'notification의 생성 Date, ISO String',
    example: '2024-04-10T09:21:19.132Z',
  })
  date: string;

  @ApiProperty({ description: '새로운 알림인지 여부', example: true })
  isNew: boolean;

  constructor(entity: Notifications) {
    this.title = entity.title;
    this.body = entity.body;
    this.date = entity.createdAt.toISOString();
    this.isNew = !entity.isRead;
  }
}
