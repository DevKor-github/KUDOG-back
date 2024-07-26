import { PageResponse } from '@/common/dtos/pageResponse';
import { applyDecorators } from '@nestjs/common';
import { ApiDefaultResponse, ApiQuery } from '@nestjs/swagger';
import { ApiKudogExceptionResponse } from '../apiKudogExceptionRespone.decorator';

export function ApiPagination() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      example: 1,
      description: '1 for default',
    }),
    ApiQuery({
      name: 'pageSize',
      type: Number,
      required: false,
      example: 10,
      description: '10 for default',
    }),
    ApiDefaultResponse({
      description:
        '기본 page response. records에 data가 들어갑니다. 위의 type을 확인해주세요',
      type: PageResponse,
    }),
    ApiKudogExceptionResponse(['INVALID_PAGE_QUERY']),
  );
}
