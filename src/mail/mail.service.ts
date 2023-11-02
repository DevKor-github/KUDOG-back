import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MailEntity from 'src/entities/mail.entity';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MailEntity)
    private readonly mailRepository: Repository<MailEntity>,
  ) {}

  async sendVerificationCode(userId: number, to: string) {
    const code = (Math.random() * 1000000).toString().padStart(6, '0');

    await this.mailerService.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: '[KUDOG] 이메일 인증 코드입니다.',
      html: `인증 번호 ${code}를 입력해주세요.`,
    });

    const entity = this.mailRepository.create({
      portalEmail: to,
      subscriberEmail: code,
      user: { userId },
    });

    await this.mailRepository.save(entity);
  }

  async checkVerificationCode(email: string, code: string) {
    const mailEntity = await this.mailRepository.findOne({
      where: { portalEmail: email },
    });

    //if(mailEntity.portalEmail)
  }
}
