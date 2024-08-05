import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import { type DataSource, LessThan, Repository } from 'typeorm';
import { ChangePwdAuthenticationEntity } from './entities/changePwd.entity';
import { EmailAuthenticationEntity } from './entities/emailAuthentication.entity';
import { RefreshTokenEntity } from './entities/refreshToken.entity';
@Injectable()
export class AuthRepository {
  private changePwdAuthEntityRepository: Repository<ChangePwdAuthenticationEntity>;
  private emailAuthEntityRepository: Repository<EmailAuthenticationEntity>;
  private refreshTokenEntityRepository: Repository<RefreshTokenEntity>;
  constructor(@InjectDataSource() private dataSource: DataSource) {
    this.changePwdAuthEntityRepository = this.dataSource.getRepository(
      ChangePwdAuthenticationEntity,
    );
    this.emailAuthEntityRepository = this.dataSource.getRepository(
      EmailAuthenticationEntity,
    );
    this.refreshTokenEntityRepository =
      this.dataSource.getRepository(RefreshTokenEntity);
  }

  async findValidToken(
    token: string,
    id: number,
  ): Promise<RefreshTokenEntity | undefined> {
    return this.refreshTokenEntityRepository.findOne({
      where: { token, userId: id },
    });
  }

  async insertToken(token: string, userId: number): Promise<void> {
    await this.refreshTokenEntityRepository.insert({ userId, token });
  }

  async findNewestEmailAuth(email: string): Promise<EmailAuthenticationEntity> {
    return this.emailAuthEntityRepository.findOne({
      where: { email },
      order: { createdAt: 'DESC' },
    });
  }

  async findNewestChangePwdAuthByUserId(
    userId: number,
  ): Promise<ChangePwdAuthenticationEntity> {
    return this.changePwdAuthEntityRepository.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findChangePwdAuthByCode(
    code: string,
  ): Promise<ChangePwdAuthenticationEntity> {
    return this.changePwdAuthEntityRepository.findOne({ where: { code } });
  }

  async findByToken(token: string): Promise<RefreshTokenEntity> {
    return this.refreshTokenEntityRepository.findOne({ where: { token } });
  }

  async removeToken(token: RefreshTokenEntity): Promise<void> {
    await this.refreshTokenEntityRepository.remove(token);
  }

  async insertChangePwdAuth(userId: number, code: string) {
    await this.changePwdAuthEntityRepository.insert({ userId, code });
  }

  async authenticatePwdCode(entity: ChangePwdAuthenticationEntity) {
    entity.authenticated = true;
    await this.changePwdAuthEntityRepository.save(entity);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredEntities() {
    this.changePwdAuthEntityRepository.delete({
      createdAt: LessThan(new Date(Date.now() - 60 * 60 * 1000)),
    });

    this.emailAuthEntityRepository.delete({
      createdAt: LessThan(new Date(Date.now() - 60 * 60 * 1000)),
    });

    this.refreshTokenEntityRepository.delete({
      createdAt: LessThan(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
    });
  }
}
