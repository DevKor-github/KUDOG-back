import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ChannelService } from 'src/channel/channel.service';

@Catch()
export class InternalErrorFilter implements ExceptionFilter {
  constructor(private readonly channelService: ChannelService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.channelService
      .sendMessageToKudog('internal error report : ')
      .then(async () => {
        exception.name &&
          (await this.channelService.sendMessageToKudog(
            'name : ' + exception.name,
          ));
      })
      .then(async () => {
        exception.message &&
          (await this.channelService.sendMessageToKudog(
            'message : ' + exception.message,
          ));
      })
      .then(async () => {
        exception.stack &&
          (await this.channelService.sendMessageToKudog(
            'stack : ' + exception.stack,
          ));
      });

    response.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}
