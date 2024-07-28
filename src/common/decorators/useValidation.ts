import { UsePipes, ValidationPipe, applyDecorators } from '@nestjs/common';
import { type ExceptionNames, throwKudogException } from '../utils/exception';
import { ApiKudogExceptionResponse } from './apiKudogExceptionResponse.decorator';

export function UseValidation(exceptions: ExceptionNames[]): MethodDecorator {
  return applyDecorators(
    UsePipes(
      new ValidationPipe({
        transform: true,
        exceptionFactory(errs) {
          const err = Object.values(errs[0].contexts)[0].exception;
          throwKudogException(err);
        },
      }),
    ),
    ApiKudogExceptionResponse(exceptions),
  );
}
