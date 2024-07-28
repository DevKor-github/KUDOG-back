import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EmailAuthenticationEntity,
  KudogUser,
  Notice,
  SubscribeBoxEntity,
} from 'src/entities';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmailAuthenticationEntity,
      KudogUser,
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
