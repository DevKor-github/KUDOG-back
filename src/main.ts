import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { ChannelService } from './channel/channel.service';
import { InternalErrorFilter } from './filters/internalError.filter';
import { ExceptionFilter } from '@nestjs/common';

import 'pinpoint-node-agent';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('KUDOG API')
    .setDescription('API for KUDOG service')
    .setVersion('1.0')
    .build();

  const docs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, docs);
  const channelService = app.get<ChannelService>(ChannelService);
  const filters: ExceptionFilter<any>[] = [];
  if (process.env.NODE_ENV === 'production') {
    await channelService.sendMessageToKudog('Server Deployed');
    filters.push(new InternalErrorFilter(channelService));
  }
  filters.push(new HttpExceptionFilter());

  app.useGlobalFilters(...filters);

  await app.listen(3050);
}
bootstrap();
