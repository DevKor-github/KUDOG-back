import { InjectUser, NamedController } from '@/common/decorators';
import { UsePagination } from '@/common/decorators';
import { SubscribeDocs } from '@/common/decorators/docs';
import { PageQuery } from '@/common/dtos/pageQuery';
import { PageResponse } from '@/common/dtos/pageResponse';
import { JwtPayload } from '@/common/types/auth';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IntValidationPipe } from 'src/pipes/intValidation.pipe';
import { UseJwtGuard } from '../auth/guards/jwt.guard';
import { NoticeListResponseDto } from '../notice/dtos/NoticeListResponse.dto';
import { SubscribeBoxRequestDto } from './dtos/subscribeBoxRequest.dto';
import { SubscribeBoxResponseDto } from './dtos/subscribeBoxResponse.dto';
import { SubscribeBoxResponseDtoWithNotices } from './dtos/subscribeBoxResponseWithNotices.dto';
import { SubscribeService } from './subscribe.service';

@SubscribeDocs
@NamedController('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @UseJwtGuard()
  @Post('/box')
  async createSubscribeBox(
    @Body() body: SubscribeBoxRequestDto,
    @InjectUser() user: JwtPayload,
  ): Promise<SubscribeBoxResponseDto> {
    return this.subscribeService.createSubscribeBox(user.id, body);
  }

  @UseJwtGuard()
  @Get('/box/:subscribeBoxId')
  async getSubscribeInfo(
    @Param('subscribeBoxId', IntValidationPipe) subscribeBoxId: number,
    @InjectUser() user: JwtPayload,
    @Query('date') date: string,
  ): Promise<SubscribeBoxResponseDtoWithNotices> {
    return this.subscribeService.getSubscribeBoxInfo(
      user.id,
      subscribeBoxId,
      date,
    );
  }

  @UseJwtGuard()
  @Get('/box')
  async getSubscribeBoxes(
    @InjectUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<SubscribeBoxResponseDto>> {
    return this.subscribeService.getSubscribeBoxes(user.id, pageQuery);
  }

  @UseJwtGuard()
  @Put('/box/:subscribeBoxId')
  async updateSubscribeBox(
    @Param('subscribeBoxId', IntValidationPipe) subscribeBoxId: number,
    @InjectUser() user: JwtPayload,
    @Body() body: SubscribeBoxRequestDto,
  ): Promise<SubscribeBoxResponseDto> {
    return this.subscribeService.updateSubscribeBox(
      subscribeBoxId,
      user.id,
      body,
    );
  }

  @UseJwtGuard()
  @Delete('/box/:subscribeBoxId')
  async deleteSubscribeBox(
    @Param('subscribeBoxId', IntValidationPipe) subscribeBoxId: number,
    @InjectUser() user: JwtPayload,
  ): Promise<void> {
    return this.subscribeService.deleteSubscribeBox(subscribeBoxId, user.id);
  }

  @UseJwtGuard()
  @Get('/box/:subscribeBoxId/notices')
  async getNoticesByBoxWithDate(
    @Param('subscribeBoxId', IntValidationPipe) subscribeBoxId: number,
    @InjectUser() user: JwtPayload,
    @Query('date') date: string,
  ): Promise<NoticeListResponseDto[]> {
    return this.subscribeService.getNoticesByBoxWithDate(
      date,
      subscribeBoxId,
      user.id,
    );
  }
}
