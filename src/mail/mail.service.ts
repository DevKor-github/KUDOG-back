import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailEntity, UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MailEntity)
    private readonly mailRepository: Repository<MailEntity>,
  ) {}

  async sendVerificationCode(to: string) {
    const existingMailEntity = await this.mailRepository.findOne({
      where: { portalEmail: to },
    });
    if (existingMailEntity.subscriberEmail.includes('@'))
      throw new ConflictException('사용중인 이메일입니다.');
    else if (existingMailEntity.createdAt.getTime() + 10000 > Date.now())
      throw new BadRequestException('잠시 후에 다시 시도해주세요.');

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
    });

    await this.mailRepository.save(entity);
  }

  async checkVerificationCode(email: string, code: string) {
    const mailEntity = await this.mailRepository.findOne({
      where: { portalEmail: email },
    });
    if (!mailEntity) throw new NotFoundException('이메일이 존재하지 않습니다.');
    if (mailEntity.subscriberEmail === code) {
      mailEntity.subscriberEmail = email;
      await this.mailRepository.save(mailEntity);
      return;
    }
    throw new BadRequestException('인증 코드가 일치하지 않습니다.');
  }
}
