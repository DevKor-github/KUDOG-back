import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Mail, KudogUser, ChangePwdAuthenticationEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { SignupRequestDto } from './dtos/signupRequest.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/auth';
import { TokenResponseDto } from './dtos/tokenResponse.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(KudogUser)
    private readonly userRepository: Repository<KudogUser>,
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
    @InjectRepository(ChangePwdAuthenticationEntity)
    private readonly changePwdAuthRepository: Repository<ChangePwdAuthenticationEntity>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  saltOrRounds = 10;

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['mail'],
    });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');
    await this.mailRepository.delete({ id: user.mail.id });

    await this.userRepository.remove(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { mail: { portalEmail: email } },
    });
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const passwordMatch = await compare(password, user.passwordHash);
    if (!passwordMatch) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }
    return user.id;
  }

  async refreshJWT(id: number, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('존재하지 않는 유저입니다.');

    if (user.refreshToken !== refreshToken)
      throw new UnauthorizedException('invalid refresh token');

    const payload: JwtPayload = {
      id,
      name: user.name,
      signedAt: Date.now().toString(),
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY,
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });
    user.refreshToken = newRefreshToken;
    await this.userRepository.save(user);
    return { accessToken, refreshToken: newRefreshToken };
  }

  async getToken(id: number): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('존재하지 않는 유저입니다.');

    const payload: JwtPayload = {
      id,
      name: user.name,
      signedAt: Date.now().toString(),
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
    return { accessToken, refreshToken };
  }

  async signup(signupInfo: SignupRequestDto) {
    const {
      subscriberEmail,
      portalEmail,
      password,
      name,
      major,
      grade,
      studentId,
    } = signupInfo;

    if (!portalEmail.endsWith('@korea.ac.kr'))
      throw new BadRequestException('korea.ac.kr 이메일이 아닙니다.');
    if (!/^[a-z0-9]{6,16}$/.test(password))
      throw new BadRequestException(
        '비밀번호는 6~16자의 영문 소문자와 숫자로만 입력해주세요.',
      );
    if (!studentId.endsWith('학번'))
      throw new BadRequestException('학번 형식은 NN학번으로 입력해주세요.');

    const mail = await this.mailRepository.findOne({
      where: { portalEmail },
    });

    if (!mail) throw new BadRequestException('인증되지 않은 이메일입니다.');
    if (mail.subscriberEmail !== portalEmail) {
      throw new BadRequestException('사용중인 이메일입니다.');
    }
    mail.subscriberEmail = subscriberEmail;
    await this.mailRepository.save(mail);

    const passwordHash = await hash(password, this.saltOrRounds);
    const user = this.userRepository.create({
      mail: mail,
      name,
      major,
      grade,
      studentId,
      passwordHash,
    });
    await this.userRepository.save(user);
    return user.id;
  }

  async changePwdRequest(portalEmail: string) {
    if (!portalEmail || !portalEmail.endsWith('@korea.ac.kr'))
      throw new BadRequestException('korea.ac.kr 이메일을 입력하세요.');

    const user = await this.userRepository.findOne({
      where: { mail: { portalEmail } },
    });

    if (!user)
      throw new NotFoundException('해당 이메일의 유저가 존재하지 않습니다.');

    const existingEntity = await this.changePwdAuthRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (
      existingEntity &&
      existingEntity.createdAt.getTime() + 1000 * 10 > new Date().getTime()
    )
      throw new HttpException(
        '잠시 후에 다시 시도해주세요',
        HttpStatus.TOO_MANY_REQUESTS,
      );

    if (existingEntity)
      await this.changePwdAuthRepository.remove(existingEntity);

    const code = Math.floor(Math.random() * 1000000).toString();
    try {
      await this.mailerService.sendMail({
        from: process.env.MAIL_USER,
        to: portalEmail,
        subject: '[KUDOG] 비밀번호 재설정 이메일 인증 코드입니다.',
        html: `인증 번호 ${code}를 입력해주세요.`,
      });
    } catch (err) {
      throw new HttpException(
        '알 수 없는 이유로 메일 전송에 실패했습니다. 잠시 후에 다시 시도해주세요.',
        510,
      );
    }
    const entity = this.changePwdAuthRepository.create({
      user,
      code,
    });
    await this.changePwdAuthRepository.save(entity);
  }

  async logout(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');
    user.refreshToken = null;
    await this.userRepository.save(user);
  }

  async verifyChangePwdCode(code: string) {
    const entity = await this.changePwdAuthRepository.findOne({
      where: { code },
      order: { createdAt: 'DESC' },
    });

    if (!entity)
      throw new BadRequestException('인증 코드가 일치하지 않습니다.');
    if (entity.createdAt.getTime() + 1000 * 60 * 3 < new Date().getTime()) {
      await this.changePwdAuthRepository.remove(entity);
      throw new RequestTimeoutException(
        '인증 요청 이후 3분이 지났습니다. 다시 메일 전송을 해주세요.',
      );
    }

    entity.expireAt = new Date(new Date().getTime() + 1000 * 60 * 10);
    entity.authenticated = true;
    await this.changePwdAuthRepository.save(entity);
  }

  async changePassword(portalEmail: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { mail: { portalEmail } },
    });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    const entity = await this.changePwdAuthRepository.findOne({
      where: { user },
    });

    if (!entity.authenticated)
      throw new UnauthorizedException('인증 코드 인증이 완료되지 않았습니다.');

    if (entity.expireAt.getTime() + 1000 * 60 * 10 < new Date().getTime()) {
      throw new RequestTimeoutException(
        '인증 이후 10분이 지났습니다. 다시 메일 전송을 해주세요.',
      );
    }

    const passwordHash = await hash(password, this.saltOrRounds);
    user.passwordHash = passwordHash;
    await this.userRepository.save(user);
  }
}
