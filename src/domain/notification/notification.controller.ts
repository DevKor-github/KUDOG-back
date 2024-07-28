import { InjectUser, NamedController } from '@/common/decorators';
import { UsePagination } from '@/common/decorators';
import { NotificationDocs } from '@/common/decorators/docs';
import { PageQuery } from '@/common/dtos/pageQuery';
import { PageResponse } from '@/common/dtos/pageResponse';
import { JwtPayload } from '@/common/types/auth';
import { Body, Delete, Get, Post } from '@nestjs/common';
import { UseJwtGuard } from '../auth/guards/jwt.guard';
import { NotificationInfoResponseDto } from './dtos/noticiationInfoResponse.dto';
import { TokenRequestDto } from './dtos/tokenRequest.dto';
import { NotificationService } from './notification.service';

@NotificationDocs
@NamedController('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseJwtGuard()
  @Get('')
  async getNotifications(
    @InjectUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return this.notificationService.getNotifications(user.id, pageQuery);
  }

  @UseJwtGuard()
  @Get('/new')
  async getNewNotifications(
    @InjectUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return this.notificationService.getNewNotifications(user.id, pageQuery);
  }

  @UseJwtGuard()
  @Post('/token')
  async registerToken(
    @InjectUser() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<void> {
    return this.notificationService.registerToken(user.id, body.token);
  }

  @UseJwtGuard()
  @Delete('/token')
  async deleteToken(
    @InjectUser() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<void> {
    return this.notificationService.deleteToken(user.id, body.token);
  }

  @UseJwtGuard()
  @Get('/status')
  async getTokenStatus(
    @InjectUser() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<boolean> {
    return this.notificationService.getTokenStatus(user.id, body.token);
  }

  @UseJwtGuard()
  @Get('/test')
  async sendNotification(@InjectUser() user: JwtPayload): Promise<void> {
    return this.notificationService.sendNotification([user.id], 'test', 'test');
  }
}
