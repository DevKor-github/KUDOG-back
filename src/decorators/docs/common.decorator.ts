import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPage() {
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
  );
}
