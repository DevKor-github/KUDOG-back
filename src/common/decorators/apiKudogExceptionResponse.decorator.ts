import {
  EXCEPTIONS,
  type ExceptionNames,
  HttpException,
} from '@/common/utils/exception';
import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  type ApiResponseOptions,
} from '@nestjs/swagger';

export function ApiKudogExceptionResponse(names: ExceptionNames[]) {
  const examples = names.reduce(
    (acc: { [key: number]: ApiResponseOptions | undefined }, curr) => {
      const exception = EXCEPTIONS[curr];
      const statusCode = exception.statusCode;
      const responseOptions: ApiResponseOptions = acc[statusCode] ?? {
        status: statusCode,
        content: {
          'application/json': {
            examples: {},
          },
        },
      };
      responseOptions.content['application/json'].examples[curr] = {
        value: exception,
      };
      acc[statusCode] = responseOptions;
      return acc;
    },
    {},
  );
  const decorators = Object.keys(examples).map((key) =>
    ApiResponse(examples[key]),
  );
  return applyDecorators(ApiExtraModels(HttpException), ...decorators);
}
