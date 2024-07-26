import { randomUUID } from 'node:crypto';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { FileLogger } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelModule } from './channel/channel.module';
import { AuthModule } from './domain/auth/auth.module';
import { CategoryModule } from './domain/category/category.module';
import { MailModule } from './domain/mail/mail.module';
import { NoticeModule } from './domain/notice/notice.module';
import { NotificationModule } from './domain/notification/notification.module';
import { ScrapModule } from './domain/scrap/scrap.module';
import { SubscribeModule } from './domain/subscribe/subscribe.module';
import { UsersModule } from './domain/users/users.module';
import { FetchModule } from './fetch/fetch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || '5334',
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      logging: true,
      logger: new FileLogger('all', { logPath: './logs/orm.log' }),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PW,
        },
      },
    }),
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req, res) => {
          const existingID = req.id ?? req.headers['x-request-id'];
          if (existingID) return existingID;
          const id = randomUUID();
          res.setHeader('x-request-id', id);
          return id;
        },
        transport: {
          targets: [
            {
              target: 'pino/file',
              options: { destination: './logs/app.log', mkdir: true },
            },
          ],
        },
        customLogLevel: (req, res, err) => {
          if (res.statusCode >= 500 || err) return 'error';
          if (res.statusCode >= 400) return 'warn';
          if (res.statusCode >= 300) return 'silent';

          return 'info';
        },
        redact: ['req.body.password', 'req.headers.authorization'],
      },
    }),
    MailModule,
    AuthModule,
    FetchModule,
    NoticeModule,
    ChannelModule,
    UsersModule,
    ScrapModule,
    NotificationModule,
    SubscribeModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
