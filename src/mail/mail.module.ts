import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  Category,
  CategoryPerUser,
  MailEntity,
  UserEntity,
} from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      MailEntity,
      Category,
      CategoryPerUser,
    ]),
    MailerModule,
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
