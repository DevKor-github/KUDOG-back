import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryPerUser,
  Category,
  UserEntity,
  MailEntity,
} from 'src/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/refreshToken.strategy';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      Category,
      CategoryPerUser,
      MailEntity,
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
