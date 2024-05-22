import { applyDecorators } from '@nestjs/common';
import {
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProviderListResponseDto } from 'src/domain/category/dtos/ProviderListResponse.dto';
import { CategoryListResponseDto } from 'src/domain/category/dtos/categoryListResponse.dto';
import { DocumentedException } from 'src/interfaces/docsException';

type CategoryEndpoints =
  | 'getProviders'
  | 'getCategories'
  | 'getBookmarkedProviders';

export function Docs(endPoint: CategoryEndpoints) {
  switch (endPoint) {
    case 'getProviders':
      return applyDecorators(
        ApiOperation({
          summary: '학부 리스트 조회',
          description:
            'DB의 학부 리스트 조회. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
        }),
        ApiOkResponse({
          description: '학부 리스트',
          type: [ProviderListResponseDto],
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
    case 'getCategories':
      return applyDecorators(
        ApiOperation({
          summary: '학부 소속 카테고리 리스트 조회',
          description:
            'DB의 학부 소속 카테고리 리스트 조회. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
        }),
        ApiParam({
          name: 'id',
          description: '학부 id',
          type: Number,
          required: true,
          example: 1,
        }),
        ApiNotAcceptableResponse({
          description: '입력값이 유효하지 않습니다 - <변수명> 상세 정보',
          type: DocumentedException,
        }),
        ApiOkResponse({
          description: '스크랩학부 소속 카테고리들',
          type: [CategoryListResponseDto],
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
    case 'getBookmarkedProviders':
      return applyDecorators(
        ApiOperation({
          summary: '즐겨찾는 학부 목록 조회',
          description:
            '유저의 즐겨찾는 학과 목록 조회. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
        }),
        ApiOkResponse({
          description: '사용자의 즐겨찾는 학과 목록',
          type: [ProviderListResponseDto],
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
  }
}
