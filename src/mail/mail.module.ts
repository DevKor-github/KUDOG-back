import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import MailEntity from 'src/entities/mail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, MailEntity]), MailerModule],
  controllers: [MailController],
  providers: [MailService],
})
export class AuthModule {}
