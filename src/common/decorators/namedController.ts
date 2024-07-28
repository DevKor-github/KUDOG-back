import { Controller, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiKudogExceptionResponse } from './apiKudogExceptionResponse.decorator';

export function NamedController(name: string) {
  return applyDecorators(
    ApiTags(name),
    Controller(name),
    ApiKudogExceptionResponse([
      'JWT_TOKEN_EXPIRED',
      'JWT_TOKEN_INVALID',
      'INTERNAL_SERVER_ERROR',
    ]),
  );
}
