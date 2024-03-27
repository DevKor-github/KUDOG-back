import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailAuthenticationEntity, KudogUser } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailAuthenticationEntity, KudogUser]),
    MailerModule,
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
