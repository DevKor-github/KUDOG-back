import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EmailAuthenticationEntity,
  KudogUserEntity,
  Notice,
  SubscribeBoxEntity,
} from 'src/entities';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmailAuthenticationEntity,
      KudogUserEntity,
      SubscribeBoxEntity,
      Notice,
    ]),
    MailerModule,
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
