import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPerUser, Category, KudogUser, Mail } from 'src/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/refreshToken.strategy';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([KudogUser, Category, CategoryPerUser, Mail]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
