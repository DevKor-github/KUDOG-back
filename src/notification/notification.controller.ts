import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationCreateDto } from './dtos/NotificationCreate.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  async getNotifications(@Param('userId') userId: number) {
    return this.notificationService.getNotifications(userId);
  }

  @Post()
  async sendNotification(
    @Body() createDto: NotificationCreateDto,
    @Body('user') user: any,
  ) {
    const { title, body } = createDto;
    return this.notificationService.sendNotification(user, title, body);
  }
}
