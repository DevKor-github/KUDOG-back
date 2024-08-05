import { EXCEPTIONS } from '@/common/utils/exception';
import { ChannelService } from '@/domain/channel/channel.service';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class InternalErrorFilter implements ExceptionFilter {
  constructor(private readonly channelService: ChannelService) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const notificationMessage = `internal error report : ${exception.name}\n${exception.message}\n${exception.stack}`;
    this.channelService.sendMessageToKudog(notificationMessage);
    const { statusCode, errorCode, name, message } =
      EXCEPTIONS.INTERNAL_SERVER_ERROR;
    response.status(500).json({
      statusCode,
      errorCode,
      message,
      name,
    });
  }
}
