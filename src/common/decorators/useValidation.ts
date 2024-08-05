import { UsePipes, ValidationPipe, applyDecorators } from '@nestjs/common';
import { type ExceptionNames, throwKudogException } from '../utils/exception';
import { ApiKudogExceptionResponse } from './apiKudogExceptionResponse.decorator';

export function UseValidation(exceptions: ExceptionNames[]): MethodDecorator {
  return applyDecorators(
    UsePipes(
      new ValidationPipe({
        transform: true,
        //whitelist: true,
        exceptionFactory(errs) {
          console.log(errs[0].value);
          console.log(typeof errs[0].value);
          console.log(errs[0].constraints);
          const err = Object.values(errs[0].contexts)[0].exception;
          throwKudogException(err);
        },
      }),
    ),
    ApiKudogExceptionResponse(exceptions),
  );
}
