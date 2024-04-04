import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { ChannelService } from './channel/channel.service';
import { InternalErrorFilter } from './filters/internalError.filter';

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
  app.useGlobalFilters(new HttpExceptionFilter());
  if (process.env.NODE_ENV === 'production') {
    await channelService.sendMessageToKudog('Server Deployed');
    app.useGlobalFilters(new InternalErrorFilter(channelService));
  }

  await app.listen(3050);
}
bootstrap();
