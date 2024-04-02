import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ScrapboxService } from './scrapbox.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PagedNoticeListDto } from './dtos/ScrapBoxListResponse.dto';
import { DocumentedException } from 'src/interfaces/docsException';
import { ScrapBoxNoticeInfoResponseDto } from './dtos/ScrapBoxInfoResponse.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notice')
@ApiTags('notice')
export class ScrapboxController {
  constructor(private readonly scrapboxService: ScrapboxService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/list/scrapbox/:scrapBoxId')
  @ApiOperation({
    summary: '스크랩 박스에 있는 공지 리스트 조회',
    description:
      '스크랩 박스에 있는 공지 리스트를 가져옵니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
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
  async getNoticesInScrapBox(
    @Param('scrapBoxId') scrapBoxId: number,
    @Query('page') page: number,
    @Req() req: any,
  ) {
    return await this.scrapboxService.getNoticesInScrapBox(
      req.user.id,
      scrapBoxId,
      page,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/scrapbox/:scrapBoxId/remove/:noticeId')
  @ApiOperation({
    summary: '스크랩 박스에서 공지 삭제',
    description:
      '스크랩 박스에서 특정 공지를 삭제합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
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
  async removeNoticeInScrapBox(
    @Param('scrapBoxId') scrapBoxId: number,
    @Param('noticeId') noticeId: number,
    @Req() req: any,
  ) {
    return await this.scrapboxService.removeNoticeInScrapBox(
      scrapBoxId,
      req.user.id,
      noticeId,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/scrapbox/:scrapBoxId/remove-all')
  @ApiOperation({
    summary: '스크랩 박스에서 모든 공지 삭제',
    description:
      '스크랩 박스에서 모든 공지를 삭제합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
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
  async removeAllNoticesInScrapBox(
    @Param('scrapBoxId') scrapBoxId: number,
    @Req() req: any,
  ) {
    return await this.scrapboxService.removeAllNoticesInScrapBox(
      scrapBoxId,
      req.user.id,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/info/:scrapBoxId/:noticeId')
  @ApiOperation({
    summary: '스크랩된 공지 상세 조회',
    description:
      '스크랩된 공지의 상세 정보를 조회합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({
    description: 'well done',
    type: ScrapBoxNoticeInfoResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  async getScrappedNoticeInfo(
    @Param('scrapBoxId') scrapBoxId: number,
    @Param('noticeId') noticeId: number,
    @Req() req: any,
  ) {
    return await this.scrapboxService.getScrappedNotice(scrapBoxId, noticeId);
  }
}
