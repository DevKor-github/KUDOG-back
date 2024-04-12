import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DocumentedException } from 'src/interfaces/docsException';
import { NoticeInfoResponseDto } from 'src/notice/dtos/NoticeInfoResponse.dto';
import { PagedNoticeListDto } from 'src/notice/dtos/NoticeListResponse.dto';
import { ApiPagination } from './common.decorator';

type NoticeEndpoints = 'getNoticeList' | 'getNoticeInfoById' | 'scrapNotice';

export function Docs(endPoint: NoticeEndpoints) {
  switch (endPoint) {
    case 'getNoticeList':
      return applyDecorators(
        ApiOperation({
          summary: '공지 리스트 조회 by filter',
          description:
            'database의 공지사항들을 작성날짜순으로 필터링하여 가져옵니다. 필터와 관련된 정보들은 쿼리 스트링으로, page size 10, Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
        }),
        ApiOkResponse({
          description: 'well done',
          type: PagedNoticeListDto,
        }),
        ApiInternalServerErrorResponse({
          description: 'internal server error',
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
        ApiPagination(),
        ApiQuery({
          name: 'keyword',
          type: String,
          required: false,
          example: '장학',
          description: '검색어를 입력',
        }),
        ApiQuery({
          name: 'providers',
          type: String,
          required: false,
          description:
            '필터를 적용할 학부 목록을 ","로 연결하여 띄어쓰기없이 작성해주세요',
          example: '정보대학,미디어학부',
        }),
        ApiQuery({
          name: 'categories',
          type: String,
          required: false,
          description:
            '필터를 적용할 카테고리 목록을 ","로 연결하여 띄어쓰기없이 작성해주세요.',
          example: '공지사항,장학정보',
        }),
        ApiQuery({
          name: 'start_date',
          type: String,
          required: false,
          description: 'start date',
          example: '2024-01-01',
        }),
        ApiQuery({
          name: 'end_date',
          type: String,
          required: false,
          description: 'end date',
          example: '2024-01-01',
        }),
      );
    case 'getNoticeInfoById':
      return applyDecorators(
        ApiOperation({
          summary: '공지사항 상세 조회',
          description:
            '공지사항의 상세 정보를 조회합니다. 조회수를 1 올립니다.  Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
        }),
        ApiOkResponse({
          description: 'well done',
          type: NoticeInfoResponseDto,
        }),
        ApiInternalServerErrorResponse({
          description: 'internal server error',
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
        ApiParam({
          name: 'id',
          type: Number,
          description: 'notice id',
          example: 1,
          required: true,
        }),
      );
    case 'scrapNotice':
      return applyDecorators(
        ApiOperation({
          summary: '공지 스크랩',
          description:
            '공지사항을 스크랩합니다. 이미 스크랩되어있다면 취소합니다. 스크랩 시 true, 취소 시 false를 반환합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
        }),
        ApiParam({
          name: 'noticeId',
          type: Number,
          description: 'notice id',
          example: 1,
          required: true,
        }),
        ApiParam({
          name: 'scrapBoxId',
          type: Number,
          description: 'scrapBox id',
          example: 1,
          required: true,
        }),
        ApiOkResponse({
          description:
            '스크랩 성공 시 true, 스크랩 취소 시 false를 반환합니다.',
          type: Boolean,
        }),
        ApiForbiddenResponse({
          description: '스크랩함의 소유자가 아닙니다.',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: '해당 id의 scrapBox가 존재하지 않습니다.',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: '해당 id의 notice가 존재하지 않습니다.',
          type: DocumentedException,
        }),
      );
  }
}
