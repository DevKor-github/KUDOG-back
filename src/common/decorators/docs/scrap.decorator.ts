import type { MethodNames } from '@/common/types/method';
import { ScrapBoxRequestDto } from '@/domain/scrap/dtos/scrapBoxRequest.dto';
import { ScrapBoxResponseDto } from '@/domain/scrap/dtos/scrapBoxResponse.dto';
import { ScrapBoxResponseWithNotices } from '@/domain/scrap/dtos/scrapBoxResponseWithNotices.dto';
import type { ScrapController } from '@/domain/scrap/scrap.controller';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ApiPagination } from './common.decorator';

type ScrapEndPoints = MethodNames<ScrapController>;

const ScrapDocsMap: Record<ScrapEndPoints, MethodDecorator[]> = {
  createScrapBox: [
    ApiOperation({
      summary: '스크랩박스 생성',
      description:
        '사용자를 위한 새 스크랩박스를 생성합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiBody({
      description: '스크랩박스 정보',
      type: ScrapBoxRequestDto,
    }),
    ApiCreatedResponse({
      description:
        '스크랩박스가 성공적으로 생성되었습니다. 만들어진 박스 정보를 반환합니다.',
      type: ScrapBoxResponseDto,
    }),
  ],
  getScrapBoxInfo: [
    ApiOperation({
      summary:
        '스크랩 박스 세부 정보 열람. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
      description:
        '스크랩 박스 정보 + 스크랩 박스에 포함된 공지사항들을 반환합니다.',
    }),
    ApiParam({
      name: 'scrapBoxId',
      description: '열람할 스크랩 박스의 id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiOkResponse({
      description: '스크랩박스 정보 + 스크랩박스에 포함된 공지사항들',
      type: ScrapBoxResponseWithNotices,
    }),
  ],
  getScrapBoxes: [
    ApiOperation({
      summary: '스크랩박스 목록 조회',
      description:
        '사용자의 스크랩박스 목록을 조회합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiPagination(),
    ApiOkResponse({
      description: '사용자의 스크랩박스 목록',
      type: [ScrapBoxResponseDto],
    }),
  ],
  updateScrapBox: [
    ApiOperation({
      summary: '스크랩 박스 정보 수정',
      description:
        '스크랩 박스의 정보를 수정합니다. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
    }),
    ApiParam({
      name: 'scrapBoxId',
      description: '수정할 스크랩 박스의 id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiBody({
      description: '정보들',
      type: ScrapBoxRequestDto,
    }),
    ApiOkResponse({
      description: '스크랩박스 수정 성공, 변경된 박스의 정보가 반환됩니다.',
      type: ScrapBoxResponseDto,
    }),
  ],
  deleteScrapBox: [
    ApiOperation({
      summary: '스크랩 박스 삭제',
      description:
        'id에 맞는 스크랩 박스를 삭제합니다. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
    }),
    ApiParam({
      name: 'scrapBoxId',
      description: '삭제할 스크랩 박스의 id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiOkResponse({
      description: '스크랩박스 삭제 성공',
    }),
  ],
};

export function ScrapDocs(target) {
  for (const key in ScrapDocsMap) {
    const methodDecorators = ScrapDocsMap[key as keyof typeof ScrapDocsMap];

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
