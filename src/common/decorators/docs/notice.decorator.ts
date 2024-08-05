import type { MethodNames } from '@/common/types/method';
import { AddRequestRequestDto } from '@/domain/notice/dtos/AddRequestRequest.dto';
import { NoticeInfoResponseDto } from '@/domain/notice/dtos/NoticeInfoResponse.dto';
import { NoticeListResponseDto } from '@/domain/notice/dtos/NoticeListResponse.dto';
import type { NoticeController } from '@/domain/notice/notice.controller';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ApiPagination } from './common.decorator';

type NoticeEndpoints = MethodNames<NoticeController>;

const NoticeDocsMap: Record<NoticeEndpoints, MethodDecorator[]> = {
  getNoticeList: [
    ApiOperation({
      summary: '공지 리스트 조회 by filter',
      description:
        'database의 공지사항들을 작성날짜순으로 필터링하여 가져옵니다. 필터와 관련된 정보들은 쿼리 스트링으로, page size 10, Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiOkResponse({
      description: 'well done',
      type: NoticeListResponseDto,
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
  ],
  getNoticeInfoById: [
    ApiOperation({
      summary: '공지사항 상세 조회',
      description:
        '공지사항의 상세 정보를 조회합니다. 조회수를 1 올립니다.  Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiOkResponse({
      description: 'well done',
      type: NoticeInfoResponseDto,
    }),
    ApiParam({
      name: 'id',
      type: Number,
      description: 'notice id',
      example: 1,
      required: true,
    }),
  ],
  scrapNotice: [
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
      description: '스크랩 성공 시 true, 스크랩 취소 시 false를 반환합니다.',
      type: Boolean,
    }),
  ],
  addNoticeRequest: [
    ApiOperation({
      description: '공지사항 추가 요청, access token 보내주세요',
      summary: '공지사항 추가 요청',
    }),
    ApiBody({
      type: AddRequestRequestDto,
    }),
    ApiCreatedResponse({ description: 'OK' }),
  ],
};

export function NoticeDocs(target) {
  for (const key in NoticeDocsMap) {
    const methodDecorators = NoticeDocsMap[key as keyof typeof NoticeDocsMap];

    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
    if (descriptor) {
      for (const decorator of methodDecorators) {
        decorator(target.prototype, key, descriptor);
      }
      Object.defineProperty(target.prototype, key, descriptor);
    }
  }
  return target;
}
