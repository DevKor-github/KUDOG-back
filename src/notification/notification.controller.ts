import { Controller, Get, Body, UseGuards, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';
import { Docs } from 'src/decorators/docs/notification.decorator';
import { NotificationService } from './notification.service';
import { NotificationInfoResponseDto } from './dtos/noticiationInfoResponse.dto';
import { PageResponse } from 'src/interfaces/pageResponse';
import { TokenRequestDto } from './dtos/tokenRequest.dto';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('')
  async getNotifications(
    @User() user: JwtPayload,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return await this.notificationService.getNotifications(user.id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/new')
  async getNewNotifications(
    @User() user: JwtPayload,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return await this.notificationService.getNewNotifications(user.id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('/token')
  async registerToken(
    @User() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<void> {
    return await this.notificationService.registerToken(user.id, body.token);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete('/token')
  async deleteToken(
    @User() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<void> {
    return await this.notificationService.deleteToken(user.id, body.token);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/status')
  async getTokenStatus(
    @User() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<boolean> {
    return await this.notificationService.getTokenStatus(user.id, body.token);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/test')
  async sendNotification(@User() user: JwtPayload): Promise<void> {
    return await this.notificationService.sendNotification(
      [user.id],
      'test',
      'test',
    );
  }
}
