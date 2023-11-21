import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PagedNoticeListDto } from './dtos/NoticeListResponse.dto';
import { DocumentedException } from 'src/interfaces/docsException';
import { NoticeInfoResponseDto } from './dtos/NoticeInfoResponse.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notice')
@ApiTags('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  //@UseGuards(AuthGuard('jwt-access'))
  @Get('/list/bydate')
  @ApiOperation({
    summary: '공지 리스트 조회',
    description:
      'database의 공지사항들을 작성날짜순으로 가져옵니다. category 상관 X, page size 10, Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({
    description: 'well done',
    type: PagedNoticeListDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
    description: '1 for default',
  })
  async getNoticeListByDate(@Req() req: any, @Query('page') page: number) {
    return await this.noticeService.getNoticesByTime(1, page);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list/:categoryId/bydate')
  @ApiOperation({
    summary: '공지 리스트 조회 by category Id',
    description:
      'database의 공지사항들을 작성날짜순으로 가져옵니다. category id 설정, page size 10, Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({
    description: 'well done',
    type: PagedNoticeListDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
    description: '1 for default',
  })
  @ApiParam({
    name: 'categoryId',
    type: Number,
    required: true,
    description: 'category id',
    example: 1,
  })
  async getNoticeListByCategoryIdOrderByDate(
    @Param('categoryId') categoryId: number,
    @Query('page') page: number,
    @Req() req: any,
  ) {
    return await this.noticeService.getNoticesByCategoryIdOrderByDate(
      req.user.id,
      categoryId,
      page,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list/provider/:providerId/bydate')
  @ApiOperation({
    summary: '공지 리스트 조회 by provider Id',
    description:
      'database의 공지사항들을 작성날짜순으로 가져옵니다. provider id 설정, page size 10, Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({
    description: 'well done',
    type: PagedNoticeListDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
    description: '1 for default',
  })
  @ApiParam({
    name: 'providerId',
    type: Number,
    required: true,
    description: 'provider id',
    example: 1,
  })
  async getNoticeListByProviderIdOrderByDate(
    @Param('providerId') providerId: number,
    @Query('page') page: number,
    @Req() req: any,
  ) {
    return await this.noticeService.getNoticesByProviderIdOrderByDate(
      req.user.id,
      providerId,
      page,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list/scrap')
  @ApiOperation({
    summary: 'scrapped 공지 리스트 조회',
    description:
      'database의 공지사항들을 작성날짜순으로 가져옵니다. 스크랩된 것만, page size 10, Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({
    description: 'well done',
    type: PagedNoticeListDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
    description: '1 for default',
  })
  async getScrappedNoticeList(@Req() req: any, @Query('page') page: number) {
    return await this.noticeService.getScrappedNotices(req.user.id, page);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/info/:id')
  @ApiOperation({
    summary: '공지사항 상세 조회',
    description:
      '공지사항의 상세 정보를 조회합니다. 조회수를 1 올립니다.  Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({
    description: 'well done',
    type: NoticeInfoResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'notice id',
    example: 1,
    required: true,
  })
  async getNoticeInfoById(@Param('id') id: number) {
    return await this.noticeService.getNoticeInfoById(id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/scrap/:noticeId')
  @ApiOperation({
    summary: 'scrap/unscrap notice',
    description:
      '공지사항을 스크랩/스크랩 취소 스크랩->스크랩 취소 시 false, 스크랩 안되어있음 -> scrap 시 true를 반환합니다. . Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({
    description: 'well done',
    type: Boolean,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'notice id',
    example: 1,
    required: true,
  })
  async scrapNotice(@Param('noticeId') noticeId: number, @Req() req: any) {
    return await this.noticeService.scrapNotice(req.user.id, noticeId);
  }
}
