import { InjectAccessUser, NamedController } from '@/common/decorators';
import { UsePagination } from '@/common/decorators';
import { NoticeDocs } from '@/common/decorators/docs';
import { PageQuery } from '@/common/dtos/pageQuery';
import { PageResponse } from '@/common/dtos/pageResponse';
import { JwtPayload } from '@/common/types/auth';
import { Body, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IntValidationPipe } from 'src/pipes/intValidation.pipe';
import { JwtAccessGuard } from '../auth/passport/accessToken.strategy';
import { AddRequestRequestDto } from './dtos/AddRequestRequest.dto';
import { NoticeFilterRequestDto } from './dtos/NoticeFilterRequest.dto';
import { NoticeInfoResponseDto } from './dtos/NoticeInfoResponse.dto';
import { NoticeListResponseDto } from './dtos/NoticeListResponse.dto';
import { NoticeService } from './notice.service';

@NoticeDocs
@NamedController('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @JwtAccessGuard()
  @Get('/list')
  async getNoticeList(
    @InjectAccessUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
    @Query() filter: NoticeFilterRequestDto,
    @Query('keyword') keyword?: string,
  ): Promise<PageResponse<NoticeListResponseDto>> {
    return this.noticeService.getNoticeList(
      user.id,
      pageQuery,
      filter,
      keyword,
    );
  }

  @JwtAccessGuard()
  @Put('/:noticeId/scrap/:scrapBoxId')
  async scrapNotice(
    @InjectAccessUser() user: JwtPayload,
    @Param('noticeId', IntValidationPipe) noticeId: number,
    @Param('scrapBoxId', IntValidationPipe) scrapBoxId: number,
  ): Promise<boolean> {
    return this.noticeService.scrapNotice(user.id, noticeId, scrapBoxId);
  }

  @JwtAccessGuard()
  @Get('/info/:id')
  async getNoticeInfoById(
    @Param('id', IntValidationPipe) id: number,
    @InjectAccessUser() user: JwtPayload,
  ): Promise<NoticeInfoResponseDto> {
    return this.noticeService.getNoticeInfoById(id, user.id);
  }

  @JwtAccessGuard()
  @Post('/add-request')
  async addNoticeRequest(
    @InjectAccessUser() user: JwtPayload,
    @Body() body: AddRequestRequestDto,
  ): Promise<void> {
    return this.noticeService.addNoticeRequest(body);
  }
}
