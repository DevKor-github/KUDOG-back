import { JwtPayload } from '@/common/types/auth';
import { throwKudogException } from '@/common/utils/exception';
import { ChannelService } from '@/domain/channel/channel.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserRepository } from '../users/user.repository';
import { AuthRepository } from './auth.repository';
import {
  ChangePasswordDto,
  ChangePasswordRequestDto,
  VerifyChangePasswordRequestDto,
} from './dtos/changePwdRequest.dto';
import type { LoginRequestDto } from './dtos/loginRequestDto';
import { SignupRequestDto } from './dtos/signupRequest.dto';
import { TokenResponseDto } from './dtos/tokenResponse.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly channelService: ChannelService,
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}
  saltOrRounds = 10;

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) throwKudogException('USER_NOT_FOUND');

    await this.userRepository.remove(user);
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<JwtPayload> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throwKudogException('LOGIN_FAILED');
    }

    const passwordMatch = await compare(password, user.passwordHash);
    if (!passwordMatch) {
      throwKudogException('LOGIN_FAILED');
    }
    return { id: user.id, name: user.name };
  }

  async refreshJWT(
    payload: JwtPayload,
    token: string,
  ): Promise<TokenResponseDto> {
    const refreshToken = await this.authRepository.findValidToken(
      token,
      payload.id,
    );
    if (!refreshToken) throwKudogException('LOGIN_REQUIRED');
    await this.authRepository.removeToken(refreshToken);
    return this.getToken(payload);
  }

  async login(loginInfo: LoginRequestDto): Promise<TokenResponseDto> {
    const { email, password } = loginInfo;

    const payload = await this.validateUser(email, password);

    return this.getToken(payload);
  }

  private async getToken(payload: JwtPayload): Promise<TokenResponseDto> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });
    await this.authRepository.insertToken(refreshToken, payload.id);

    return new TokenResponseDto(accessToken, refreshToken);
  }

  async signup(signupInfo: SignupRequestDto): Promise<TokenResponseDto> {
    const { password, name, email } = signupInfo;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throwKudogException('EMAIL_ALREADY_USED');

    const mailAuthentication =
      await this.authRepository.findNewestEmailAuth(email);

    if (!mailAuthentication || mailAuthentication.authenticated !== true)
      throwKudogException('EMAIL_NOT_VALIDATED');
    if (mailAuthentication.createdAt.getTime() + 1000 * 60 * 10 < Date.now())
      throwKudogException('EMAIL_VALIDATION_EXPIRED');

    const passwordHash = await hash(password, this.saltOrRounds);

    const user = await this.userRepository.insert(email, name, passwordHash);
    const userCount = await this.userRepository.count();
    this.channelService.sendMessageToKudog(`가입자 수 ${userCount}명 돌파🔥`);
    const payload = {
      id: user.id,
      name: user.name,
    };
    return this.getToken(payload);
  }

  async changePwdRequest(dto: ChangePasswordRequestDto): Promise<void> {
    const { email } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) throwKudogException('EMAIL_NOT_FOUND');

    const existingEntity =
      await this.authRepository.findNewestChangePwdAuthByUserId(user.id);

    if (
      existingEntity &&
      existingEntity.createdAt.getTime() + 1000 * 10 > new Date().getTime()
    )
      throwKudogException('TOO_MANY_REQUESTS');
    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    try {
      await this.mailerService.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: '[KUDOG] 비밀번호 재설정 이메일 인증 코드입니다.',
        html: `인증 번호 ${code}를 입력해주세요.`,
      });
    } catch (err) {
      throwKudogException('EMAIL_SEND_FAILED');
    }
    await this.authRepository.insertChangePwdAuth(user.id, code);
  }

  async logout(refreshToken: string): Promise<void> {
    const token = await this.authRepository.findByToken(refreshToken);
    if (!token) throwKudogException('JWT_TOKEN_INVALID');

    await this.authRepository.removeToken(token);
  }

  async verifyChangePwdCode(
    dto: VerifyChangePasswordRequestDto,
  ): Promise<void> {
    const { code } = dto;
    const entity = await this.authRepository.findChangePwdAuthByCode(code);

    if (!entity) throwKudogException('CODE_NOT_CORRECT');

    if (entity.createdAt.getTime() + 1000 * 60 * 3 < Date.now())
      throwKudogException('CODE_EXPIRED');
    await this.authRepository.authenticatePwdCode(entity);
  }

  async changePassword(dto: ChangePasswordDto): Promise<void> {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email);
    if (!user) throwKudogException('USER_NOT_FOUND');

    const entity = await this.authRepository.findNewestChangePwdAuthByUserId(
      user.id,
    );

    if (!entity || !entity.authenticated)
      throwKudogException('CODE_NOT_VALIDATED');

    if (entity.createdAt.getTime() + 1000 * 60 * 10 < Date.now()) {
      throwKudogException('CODE_VALIDATION_EXPIRED');
    }

    const passwordHash = await hash(password, this.saltOrRounds);
    await this.userRepository.changePwd(user, passwordHash);
  }
}
