import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';
import { Docs } from 'src/decorators/docs/notification.decorator';
import { NotificationService } from './notification.service';
import { NotificationCreateDto } from './dtos/NotificationCreate.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/notification/:userId') // 맞는지 확인이 필요해요.
  @Docs('getNotifications')
  @ApiOkResponse({ type: [NotificationCreateDto] })
  async getNotifications(
    @Body() body: NotificationCreateDto,
    @User() user: JwtPayload,
  ): Promise<NotificationCreateDto> {
    return await this.notificationService.getNotifications(user.id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post()
  @Docs('sendNotification')
  @ApiOkResponse({ type: [NotificationCreateDto] })
  async sendNotification(
    @Body() createDto: NotificationCreateDto,
    @User() user: JwtPayload,
  ): Promise<void> {
    const { title, body, date } = createDto;
    return this.notificationService.sendNotification(user, title, body, date);
  }
}
