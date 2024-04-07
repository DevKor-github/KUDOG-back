import { ApiProperty } from '@nestjs/swagger';

export class NotificationCreateDto {
  title: string;
  body: string;
  status: string;
  createdBy: string;
}
