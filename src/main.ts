import { ExceptionFilter } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ChannelService } from './domain/channel/channel.service';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { InternalErrorFilter } from './filters/internalError.filter';

import 'pinpoint-node-agent';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('KUDOG API')
    .setDescription('API for KUDOG service')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurity('fake-auth', {
      type: 'apiKey',
      name: 'x-fake-auth',
      in: 'header',
    })
    .build();

  const docs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, docs);

  const filters: ExceptionFilter[] = [];
  if (process.env.NODE_ENV === 'production') {
    const channelService = app.get<ChannelService>(ChannelService);
    await channelService.sendMessageToKudog('Server Deployed');
    filters.push(new InternalErrorFilter(channelService));
  }
  filters.push(new HttpExceptionFilter());
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalFilters(...filters);

  await app.listen(3050);
}
bootstrap();
