import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  EmailAuthenticationEntity,
  KudogUser,
  Notice,
  SubscribeBox,
} from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmailAuthenticationEntity,
      KudogUser,
      SubscribeBox,
      Notice,
    ]),
    MailerModule,
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
