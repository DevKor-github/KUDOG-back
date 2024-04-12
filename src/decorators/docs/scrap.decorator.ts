import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DocumentedException } from 'src/interfaces/docsException';
import { ScrapBoxRequestDto } from 'src/scrap/dtos/scrapBoxRequest.dto';
import { ScrapBoxResponseDto } from 'src/scrap/dtos/scrapBoxResponse.dto';
import { ScrapBoxResponseWithNotices } from 'src/scrap/dtos/scrapBoxResponseWithNotices.dto';
import { ApiPagination } from './common.decorator';

type ScrapEndPoints =
  | 'createScrapBox'
  | 'getScrapBoxInfo'
  | 'getScrapBoxes'
  | 'updateScrapBox'
  | 'deleteScrapBox';

export function Docs(endPoint: ScrapEndPoints) {
  switch (endPoint) {
    case 'createScrapBox':
      return applyDecorators(
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
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
    case 'getScrapBoxInfo':
      return applyDecorators(
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
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
        ApiForbiddenResponse({
          description: 'userId와 scrapBox 소유자의 id가 다릅니다.',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: 'scrapBox Id에 해당하는 박스가 없습니다.',
          type: DocumentedException,
        }),
      );
    case 'getScrapBoxes':
      return applyDecorators(
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
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
    case 'updateScrapBox':
      return applyDecorators(
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
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
        ApiForbiddenResponse({
          description: 'userId와 scrapBox 소유자의 id가 다릅니다.',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: 'scrapBox Id에 해당하는 박스가 없습니다.',
          type: DocumentedException,
        }),
      );
    case 'deleteScrapBox':
      return applyDecorators(
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
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
        ApiForbiddenResponse({
          description: 'userId와 scrapBox 소유자의 id가 다릅니다.',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: 'scrapBox Id에 해당하는 박스가 없습니다.',
          type: DocumentedException,
        }),
      );
  }
}
