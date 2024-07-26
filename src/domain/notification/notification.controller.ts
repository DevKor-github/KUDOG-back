import { InjectAccessUser, NamedController } from '@/common/decorators';
import { UsePagination } from '@/common/decorators';
import { NotificationDocs } from '@/common/decorators/docs';
import { PageQuery } from '@/common/dtos/pageQuery';
import { PageResponse } from '@/common/dtos/pageResponse';
import { JwtPayload } from '@/common/types/auth';
import { Body, Delete, Get, Post } from '@nestjs/common';
import { JwtAccessGuard } from '../auth/passport/accessToken.strategy';
import { NotificationInfoResponseDto } from './dtos/noticiationInfoResponse.dto';
import { TokenRequestDto } from './dtos/tokenRequest.dto';
import { NotificationService } from './notification.service';

@NotificationDocs
@NamedController('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @JwtAccessGuard()
  @Get('')
  async getNotifications(
    @InjectAccessUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return this.notificationService.getNotifications(user.id, pageQuery);
  }

  @JwtAccessGuard()
  @Get('/new')
  async getNewNotifications(
    @InjectAccessUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return this.notificationService.getNewNotifications(
      user.id,
      pageQuery,
    );
  }

  @JwtAccessGuard()
  @Post('/token')
  async registerToken(
    @InjectAccessUser() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<void> {
    return this.notificationService.registerToken(user.id, body.token);
  }

  @JwtAccessGuard()
  @Delete('/token')
  async deleteToken(
    @InjectAccessUser() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<void> {
    return this.notificationService.deleteToken(user.id, body.token);
  }

  @JwtAccessGuard()
  @Get('/status')
  async getTokenStatus(
    @InjectAccessUser() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<boolean> {
    return this.notificationService.getTokenStatus(user.id, body.token);
  }

  @JwtAccessGuard()
  @Get('/test')
  async sendNotification(@InjectAccessUser() user: JwtPayload): Promise<void> {
    return this.notificationService.sendNotification(
      [user.id],
      'test',
      'test',
    );
  }
}
