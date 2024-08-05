import { ChannelModule } from '@/domain/channel/channel.module';
import { UsersModule } from '@/domain/users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { ChangePwdAuthenticationEntity } from './entities/changePwd.entity';
import { EmailAuthenticationEntity } from './entities/emailAuthentication.entity';
import { RefreshTokenEntity } from './entities/refreshToken.entity';
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
