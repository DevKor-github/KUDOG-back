import { ChannelModule } from '@/domain/channel/channel.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ChangePwdAuthenticationEntity,
  EmailAuthenticationEntity,
  RefreshTokenEntity,
} from 'src/entities';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChangePwdAuthenticationEntity,
      EmailAuthenticationEntity,
      RefreshTokenEntity,
    ]),
    JwtModule.register({}),
    UsersModule,
    MailerModule,
    ChannelModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
