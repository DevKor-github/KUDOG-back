import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EmailAuthenticationEntity,
  KudogUser,
  Notice,
  SubscribeBox,
} from 'src/entities';
import { In, Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(EmailAuthenticationEntity)
    private readonly emailAuthenticationRepository: Repository<EmailAuthenticationEntity>,
    @InjectRepository(KudogUser)
    private readonly kudogUserRepository: Repository<KudogUser>,
    @InjectRepository(SubscribeBox)
    private readonly subscribeBoxRepository: Repository<SubscribeBox>,
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
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
  @Cron(CronExpression.EVERY_DAY_AT_6PM, { timeZone: 'Asia/Seoul' })
  async sendMailBySubBox() {
    const subscribeBoxes = await this.subscribeBoxRepository.find({
      relations: ['categories'],
    });

    await Promise.all(
      subscribeBoxes.map(async (box) => {
        const notices = await this.noticeRepository.find({
          where: {
            category: {
              id: In(box.categories.map((category) => category.category_id)),
            },
            date: new Date().toISOString().slice(0, 10),
          },
          relations: ['category'],
        });

        let html = '';
        const today = new Date().toISOString().slice(0, 10);
        html = html.concat(`<html><head></head><body>`);
        html =
          html.concat(`	<h2 style="width: 100%; margin: 0 auto; text-align: center;">구독함: ${box.name}의 공지사항</h2>
        	<div style="width: 95%; text-align: right; margin: 0 auto;">${today}</div>
	        <div style="width: 95%; margin: 0 auto;">`);

        const noticeByCategory = new Map<string, Array<Notice>>();
        notices.forEach((notice) => {
          const category = notice.category.name;
          if (!noticeByCategory.has(category))
            noticeByCategory.set(category, []);
          noticeByCategory.get(category).push(notice);
        });
        for (const category of noticeByCategory.keys()) {
          html = html.concat(`<h4 style="text-align: left;">${category}</h4>`);
          html = html.concat(
            noticeByCategory
              .get(category)
              .map((notice) => {
                return `<p>${notice.content}</p>`;
              })
              .join('<hr style="height: 2px; width: 100%;">'),
          );
        }

        await this.sendMail(
          box.mail,
          `[KUDOG] 구독함 ${box.name}의 공지사항 ${today}`,
          html,
        );
      }),
    );
  }
}
