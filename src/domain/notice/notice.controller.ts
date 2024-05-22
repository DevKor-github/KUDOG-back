import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { ApiTags } from '@nestjs/swagger';
import { NoticeListResponseDto } from './dtos/NoticeListResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { NoticeFilterRequestDto } from './dtos/NoticeFilterRequest.dto';
import { Docs } from 'src/decorators/docs/notice.decorator';
import { InjectAccessUser } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';
import { NoticeInfoResponseDto } from './dtos/NoticeInfoResponse.dto';
import { UsePagination } from 'src/decorators';
import { PageQuery } from 'src/interfaces/pageQuery';
import { PageResponse } from 'src/interfaces/pageResponse';
import { AddRequestRequestDto } from './dtos/AddRequestRequest.dto';
import { IntValidationPipe } from 'src/pipes/intValidation.pipe';

@Controller('notice')
@ApiTags('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list')
  @Docs('getNoticeList')
  async getNoticeList(
    @InjectAccessUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
    @Query() filter: NoticeFilterRequestDto,
    @Query('keyword') keyword?: string,
  ): Promise<PageResponse<NoticeListResponseDto>> {
    return await this.noticeService.getNoticeList(
      user.id,
      pageQuery,
      filter,
      keyword,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/:noticeId/scrap/:scrapBoxId')
  @Docs('scrapNotice')
  async scrapNotice(
    @InjectAccessUser() user: JwtPayload,
    @Param('noticeId', IntValidationPipe) noticeId: number,
    @Param('scrapBoxId', IntValidationPipe) scrapBoxId: number,
  ): Promise<boolean> {
    return await this.noticeService.scrapNotice(user.id, noticeId, scrapBoxId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/info/:id')
  @Docs('getNoticeInfoById')
  async getNoticeInfoById(
    @Param('id', IntValidationPipe) id: number,
    @InjectAccessUser() user: JwtPayload,
  ): Promise<NoticeInfoResponseDto> {
    return await this.noticeService.getNoticeInfoById(id, user.id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('/add-request')
  @Docs('addNoticeRequest')
  async addNoticeRequest(
    @InjectAccessUser() user: JwtPayload,
    @Body() body: AddRequestRequestDto,
  ): Promise<void> {
    return await this.noticeService.addNoticeRequest(body);
  }
}
