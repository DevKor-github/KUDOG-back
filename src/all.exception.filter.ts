import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ChannelService } from './channel/channel.service';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly channelService: ChannelService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.message;
    const name = exception.name;

    if (status >= 500) {
      this.channelService.sendMessageToKudog(
        exception.getStatus().toString() + ' error',
      );
      this.channelService.sendMessageToKudog('message: ' + exception.message);
      this.channelService.sendMessageToKudog('name: ' + exception.name);
      this.channelService.sendMessageToKudog('stack: ' + exception.stack);
      const request = host.switchToHttp().getRequest();

      this.channelService.sendMessageToKudog(
        'request: ' + JSON.stringify(request),
      );
    }

    response.status(status).json({
      status,
      message: message,
      name: name,
    });
  }
}
