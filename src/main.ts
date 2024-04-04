import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './all.exception.filter';
import { ChannelService } from './channel/channel.service';

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
  app.useGlobalFilters(new AllExceptionFilter(channelService));
  await app.listen(3050);
}
bootstrap();

//http://localhost:3000/api
