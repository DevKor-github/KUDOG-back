import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { FetchModule } from './fetch/fetch.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NoticeModule } from './notice/notice.module';
import { ProviderModule } from './provider/provider.module';
import { ChannelModule } from './channel/channel.module';
import { UsersModule } from './users/users.module';
import { ScrapModule } from './scrap/scrap.module';
import { NotificationModule } from './notification/notification.module';
import { SubscribeModule } from './subscribe/subscribe.module';

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
    CategoryModule,
    FetchModule,
    NoticeModule,
    ProviderModule,
    ChannelModule,
    UsersModule,
    ScrapModule,
    NotificationModule,
    SubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
