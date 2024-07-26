import { ChannelModule } from '@/domain/channel/channel.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ChangePwdAuthenticationEntity,
  EmailAuthenticationEntity,
  KudogUser,
  RefreshTokenEntity,
} from 'src/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy as AccessStrategy } from './passport/accessToken.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy as RefreshStrategy } from './passport/refreshToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KudogUser,
      ChangePwdAuthenticationEntity,
      EmailAuthenticationEntity,
      RefreshTokenEntity,
    ]),
    MailerModule,
    JwtModule.register({}),
    ChannelModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshStrategy, AccessStrategy, LocalStrategy],
})
export class AuthModule {}
