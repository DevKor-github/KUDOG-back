import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './domain/mail/mail.module';
import { AuthModule } from './domain/auth/auth.module';
import { FetchModule } from './fetch/fetch.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NoticeModule } from './domain/notice/notice.module';
import { ChannelModule } from './channel/channel.module';
import { UsersModule } from './domain/users/users.module';
import { ScrapModule } from './domain/scrap/scrap.module';
import { NotificationModule } from './domain/notification/notification.module';
import { SubscribeModule } from './domain/subscribe/subscribe.module';
import { CategoryModule } from './domain/category/category.module';

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
