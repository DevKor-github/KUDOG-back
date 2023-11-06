import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Category, CategoryPerUser, Mail, KudogUser } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([KudogUser, Mail, Category, CategoryPerUser]),
    MailerModule,
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
