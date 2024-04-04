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
import { NoticeFilterRequestDto } from './dtos/NoticeFilterRequest.dto';

@Controller('notice')
@ApiTags('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @UseGuards(AuthGuard('jwt-access'))
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
    return await this.noticeService.getNoticesByTime(req.user.id, page);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list/filter')
  @ApiOperation({
    summary: '공지 리스트 조회 by filter',
    description:
      'database의 공지사항들을 작성날짜순으로 필터링하여 가져옵니다. 필터와 관련된 정보들은 쿼리 스트링으로, page size 10, Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
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
  @ApiQuery({
    name: 'providers',
    type: String,
    required: false,
    description:
      '필터를 적용할 학부 목록을 ","로 연결하여 띄어쓰기없이 작성해주세요',
    example: '정보대학,미디어학부',
  })
  @ApiQuery({
    name: 'categories',
    type: String,
    required: false,
    description:
      '필터를 적용할 카테고리 목록을 ","로 연결하여 띄어쓰기없이 작성해주세요.',
    example: '공지사항,장학정보',
  })
  @ApiQuery({
    name: 'start_date',
    type: String,
    required: false,
    description: 'start date',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'end_date',
    type: String,
    required: false,
    description: 'end date',
    example: '2024-01-01',
  })
  async getNoticeListByFiltersOrderByDate(
    @Query() filter: NoticeFilterRequestDto,
    @Query('page') page: number,
    @Req() req: any,
  ): Promise<PagedNoticeListDto> {
    return await this.noticeService.getNoticesByFilterOrderByDate(
      req.user.id,
      filter,
      page,
    );
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

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list/search')
  @ApiOperation({
    summary: '공지사항 검색',
    description:
      '공지사항을 검색합니다. search keyword로 제목, 내용, 글쓴이를 기준으로 검색합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
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
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: true,
    example: '장학금',
    description: '검색 키워드',
  })
  async searchNotice(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Req() req: any,
  ) {
    return await this.noticeService.searchNotice(keyword, req.user.id, page);
  }
}
