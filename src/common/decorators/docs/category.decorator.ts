import type { MethodNames } from '@/common/types/method';
import type { CategoryController } from '@/domain/category/category.controller';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ProviderListResponseDto } from 'src/domain/category/dtos/ProviderListResponse.dto';
import { CategoryListResponseDto } from 'src/domain/category/dtos/categoryListResponse.dto';
import { ApiKudogExceptionResponse } from '../apiKudogExceptionRespone.decorator';

type CategoryEndpoints = MethodNames<CategoryController>;

const CategoryDocsMap: Record<CategoryEndpoints, MethodDecorator[]> = {
  getProviders: [
    ApiOperation({
      summary: '학부 리스트 조회',
      description:
        'DB의 학부 리스트 조회. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
    }),
    ApiOkResponse({
      description: '학부 리스트',
      type: [ProviderListResponseDto],
    }),
    ApiKudogExceptionResponse(['ACCESS_TOKEN_EXPIRED']),
  ],
  getCategories: [
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
    ApiOkResponse({
      description: '스크랩학부 소속 카테고리들',
      type: [CategoryListResponseDto],
    }),
    ApiKudogExceptionResponse(['ACCESS_TOKEN_EXPIRED', 'TODO_INVALID']),
  ],
  getBookmarkedProviders: [
    ApiOperation({
      summary: '즐겨찾는 학부 목록 조회',
      description:
        '유저의 즐겨찾는 학과 목록 조회. Authoization 헤더에 Bearer ${accessToken}을 넣어주세요',
    }),
    ApiOkResponse({
      description: '사용자의 즐겨찾는 학과 목록',
      type: [ProviderListResponseDto],
    }),
    ApiKudogExceptionResponse(['ACCESS_TOKEN_EXPIRED']),
  ],
};

export function CategoryDocs(target) {
  for (const key in CategoryDocsMap) {
    const methodDecorators =
      CategoryDocsMap[key as keyof typeof CategoryDocsMap];

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
