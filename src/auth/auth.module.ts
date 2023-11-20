import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KudogUser, Mail, ChangePwdAuthenticationEntity } from 'src/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy as RefreshStrategy } from './passport/refreshToken.strategy';
import { JwtStrategy as AccessStrategy } from './passport/accessToken.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([KudogUser, Mail, ChangePwdAuthenticationEntity]),
    MailerModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshStrategy, AccessStrategy, LocalStrategy],
})
export class AuthModule {}
