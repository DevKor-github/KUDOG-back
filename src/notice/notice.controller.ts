import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
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
import { NoticeListResponseDto } from './dtos/NoticeListResponse.dto';
import { DocumentedException } from 'src/interfaces/docsException';
import { NoticeInfoResponseDto } from './dtos/NoticeInfoResponse.dto';
import { AuthGuard } from '@nestjs/passport';

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
    type: [NoticeListResponseDto],
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
  async getNoticeListByDate(@Query('page') page: number) {
    return await this.noticeService.getNoticesByTime(page);
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
}
