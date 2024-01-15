import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Logger } from './logger';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  customLogger: Logger;

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.message;
    const name = exception.name;

    if (status >= 500) {
      console.error(exception.message);
      console.error(exception.stack);
    }

    response.status(status).json({
      status,
      message: message,
      name: name,
    });
  }
}
