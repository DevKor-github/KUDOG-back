import { HttpException } from '@/common/utils/exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { statusCode, errorCode, message, name } = exception;

    response.status(statusCode).json({
      statusCode,
      errorCode,
      message,
      name,
    });
  }
}
