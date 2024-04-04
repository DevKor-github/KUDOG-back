import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { ApiTags } from '@nestjs/swagger';
import { PagedNoticeListDto } from './dtos/NoticeListResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { NoticeFilterRequestDto } from './dtos/NoticeFilterRequest.dto';
import { Docs } from 'src/decorators/docs/notice.decorator';
import { User } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';

@Controller('notice')
@ApiTags('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list/filter')
  @Docs('getNoticeListByFiltersOrderByDate')
  async getNoticeListByFiltersOrderByDate(
    @Query() filter: NoticeFilterRequestDto,
    @Query('page') page: number,
    @User() user: JwtPayload,
  ): Promise<PagedNoticeListDto> {
    return await this.noticeService.getNoticesByFilterOrderByDate(
      user.id,
      filter,
      page,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/info/:id')
  @Docs('getNoticeInfoById')
  async getNoticeInfoById(@Param('id') id: number) {
    return await this.noticeService.getNoticeInfoById(id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list/search')
  @Docs('searchNotice')
  async searchNotice(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @User() user: JwtPayload,
  ) {
    return await this.noticeService.searchNotice(keyword, user.id, page);
  }
}
