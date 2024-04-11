import {
  Controller,
  Get,
  Body,
  UseGuards,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';
import { Docs } from 'src/decorators/docs/notification.decorator';
import { NotificationService } from './notification.service';
import { NotificationInfoResponseDto } from './dtos/noticiationInfoResponse.dto';
import { PageResponse } from 'src/interfaces/pageResponse';
import { TokenRequestDto } from './dtos/tokenRequest.dto';
import { PageQuery } from 'src/interfaces/pageQuery';
import { UsePage } from 'src/decorators/page.decorator';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('')
  @Docs('getNotifications')
  async getNotifications(
    @User() user: JwtPayload,
    @UsePage() pageQuery: PageQuery,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return await this.notificationService.getNotifications(user.id, pageQuery);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/new')
  @Docs('getNewNotifications')
  async getNewNotifications(
    @User() user: JwtPayload,
    @UsePage() pageQuery: PageQuery,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return await this.notificationService.getNewNotifications(
      user.id,
      pageQuery,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('/token')
  @Docs('registerToken')
  async registerToken(
    @User() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<void> {
    return await this.notificationService.registerToken(user.id, body.token);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete('/token')
  @Docs('deleteToken')
  async deleteToken(
    @User() user: JwtPayload,
    @Body() body: TokenRequestDto,
  ): Promise<void> {
    return await this.notificationService.deleteToken(user.id, body.token);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/status')
  @Docs('getTokenStatus')
  async getTokenStatus(
    @User() user: JwtPayload,
    @Query('token') token: string,
  ): Promise<boolean> {
    return await this.notificationService.getTokenStatus(user.id, token);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @ApiOperation({
    summary: 'FCM test',
    description:
      'JWT만 보내주면, 해당 유저가 등록한 기기에 모두 알림을 보냅니다',
  })
  @Get('/test')
  async sendNotification(@User() user: JwtPayload): Promise<void> {
    return await this.notificationService.sendNotification(
      [user.id],
      'test',
      'test',
    );
  }
}
