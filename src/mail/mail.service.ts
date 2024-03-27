import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailAuthenticationEntity, KudogUser } from 'src/entities';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(EmailAuthenticationEntity)
    private readonly emailAuthenticationRepository: Repository<EmailAuthenticationEntity>,
    @InjectRepository(KudogUser)
    private readonly kudogUserRepository: Repository<KudogUser>,
  ) {}

  async sendMail(to: string, subject: string, html: string) {
    await this.mailerService.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      html: html,
    });
  }

  async sendVerificationCode(to: string) {
    const existingUser = await this.kudogUserRepository.findOne({
      where: { email: to },
    });
    if (existingUser) throw new ConflictException('사용중인 이메일입니다.');

    if (!to.endsWith('@korea.ac.kr'))
      throw new BadRequestException('korea.ac.kr 이메일이 아닙니다.');

    const mailAuthentication = await this.emailAuthenticationRepository.findOne(
      {
        where: { email: to },
        order: { createdAt: 'DESC' },
      },
    );

    if (mailAuthentication) {
      if (mailAuthentication.createdAt.getTime() + 1000 * 10 > Date.now())
        throw new BadRequestException('잠시 후에 다시 시도해주세요.');

      await this.emailAuthenticationRepository.remove(mailAuthentication);
    }
    const code = (Math.random() * 1000000)
      .toString()
      .slice(0, 6)
      .padStart(6, '0');

    await this.mailerService.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: '[KUDOG] 이메일 인증 코드입니다.',
      html: `인증 번호 ${code}를 입력해주세요.`,
    });

    const entity = this.emailAuthenticationRepository.create({
      email: to,
      code: code,
    });

    await this.emailAuthenticationRepository.save(entity);
  }

  async checkVerificationCode(email: string, code: string) {
    const existingUser = await this.kudogUserRepository.findOne({
      where: { email: email },
    });
    if (existingUser) throw new ConflictException('사용중인 이메일입니다.');

    if (!email.endsWith('@korea.ac.kr'))
      throw new BadRequestException('korea.ac.kr 이메일이 아닙니다.');

    const mail = await this.emailAuthenticationRepository.findOne({
      where: { email: email },
    });
    if (!mail) throw new NotFoundException('이메일이 존재하지 않습니다.');

    if (mail.createdAt.getTime() + 1000 * 60 * 3 < Date.now()) {
      throw new RequestTimeoutException('인증 요청에서 3분이 지났습니다.');
    }

    if (mail.code === code) {
      mail.authenticated = true;
      await this.emailAuthenticationRepository.save(mail);
      return;
    }
    throw new BadRequestException('인증 코드가 일치하지 않습니다.');
  }
}
