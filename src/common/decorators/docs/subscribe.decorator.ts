import type { MethodNames } from '@/common/types/method';
import type { SubscribeController } from '@/domain/subscribe/subscribe.controller';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { NoticeListResponseDto } from 'src/domain/notice/dtos/NoticeListResponse.dto';
import { SubscribeBoxRequestDto } from 'src/domain/subscribe/dtos/subscribeBoxRequest.dto';
import { SubscribeBoxResponseDto } from 'src/domain/subscribe/dtos/subscribeBoxResponse.dto';
import { SubscribeBoxResponseDtoWithNotices } from 'src/domain/subscribe/dtos/subscribeBoxResponseWithNotices.dto';
import { ApiPagination } from './common.decorator';

type SubscribeEndPoint = MethodNames<SubscribeController>;

const SubscribeDocsMap: Record<SubscribeEndPoint, MethodDecorator[]> = {
  createSubscribeBox: [
    ApiOperation({
      summary: '구독함 생성',
      description:
        '새 구독함를 생성합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiBody({
      description: '구독함 정보',
      type: SubscribeBoxRequestDto,
    }),
    ApiCreatedResponse({
      description:
        '구독함이 성공적으로 생성되었습니다. 만들어진 박스 정보를 반환합니다.',
      type: SubscribeBoxResponseDto,
    }),
  ],
  getSubscribeInfo: [
    ApiOperation({
      summary: '구독함 날짜별 세부 정보 열람',
      description:
        '구독함 정보 + 구독함에 포함된 해당 날짜의 공지사항들을 반환합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiParam({
      name: 'subscribeBoxId',
      description: '열람할 구독함의 id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiQuery({
      name: 'date',
      description: '열람할 날짜',
      type: String,
      required: true,
      example: '2024-04-08',
    }),
    ApiOkResponse({
      description: '구독함 정보 + 구독함에 포함된 공지사항들',
      type: SubscribeBoxResponseDtoWithNotices,
    }),
  ],
  getSubscribeBoxes: [
    ApiOperation({
      summary: '구독함 목록 조회',
      description:
        '사용자의 구독함 목록을 조회합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiPagination(),
    ApiOkResponse({
      description: '사용자의 구독함 목록',
      type: [SubscribeBoxResponseDto],
    }),
  ],
  updateSubscribeBox: [
    ApiOperation({
      summary: '구독함 정보 수정',
      description:
        '구독함의 정보를 수정합니다. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
    }),
    ApiParam({
      name: 'scrapBoxId',
      description: '수정할 구독함의 id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiBody({
      description: '구독함 정보들',
      type: SubscribeBoxRequestDto,
    }),
    ApiOkResponse({
      description: '구독함 수정 성공, 변경된 구독함의 정보가 반환됩니다.',
      type: SubscribeBoxResponseDto,
    }),
  ],
  deleteSubscribeBox: [
    ApiOperation({
      summary: '구독함 삭제',
      description:
        'id에 맞는 구독함을 삭제합니다. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
    }),
    ApiParam({
      name: 'subscribeBoxId',
      description: '구독함의 id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiOkResponse({
      description: '구독함 삭제 성공',
    }),
  ],
  getNoticesByBoxWithDate: [
    ApiOperation({
      summary: '구독함 날짜별 공지사항 조회',
      description:
        '구독함에 포함된 해당 날짜의 공지사항들을 반환합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiParam({
      name: 'subscribeBoxId',
      description: '조회할 구독함의 id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiQuery({
      name: 'date',
      description: '조회할 날짜',
      type: String,
      required: true,
      example: '2024. 04. 08',
    }),
    ApiOkResponse({
      type: [NoticeListResponseDto],
    }),
  ],
};

export function SubscribeDocs(target) {
  for (const key in SubscribeDocsMap) {
    const methodDecorators =
      SubscribeDocsMap[key as keyof typeof SubscribeDocsMap];

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
