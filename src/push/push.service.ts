import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FcmToken } from 'src/entities/fcmtoken.entity';
import { CreateUserTokenDto } from './dtos/CreateUserToken.dto';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(FcmToken)
    private fcmTokenRepository: Repository<FcmToken>,
  ) {}

  async createUserToken(
    userId: number,
    dto: CreateUserTokenDto,
  ): Promise<FcmToken> {
    try {
      const token = await this.fcmTokenRepository.save({
        user: { id: userId },
        token: dto.token,
      });
      return token;
    } catch (err) {
      throw new UnauthorizedException('token 만료 혹은 잘못된 token');
    }
  }
  async deleteUserToken(userId: number, token: string): Promise<void> {
    const fcmToken = await this.fcmTokenRepository.findOne({
      where: {
        token: token,
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (!fcmToken) {
      throw new ForbiddenException('권한이 존재하지 않습니다');
    }
    await this.fcmTokenRepository.delete(fcmToken.id);
  }
}
