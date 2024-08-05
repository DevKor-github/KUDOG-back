import { KudogUserEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { type DataSource, type FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private entityRepository: Repository<KudogUserEntity>;

  constructor(@InjectDataSource() private dataSource: DataSource) {
    this.entityRepository = this.dataSource.getRepository(KudogUserEntity);
  }

  async findById(id: number): Promise<KudogUserEntity | undefined> {
    return this.entityRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<KudogUserEntity | undefined> {
    return this.entityRepository.findOne({ where: { email } });
  }

  async remove(user: KudogUserEntity): Promise<KudogUserEntity> {
    return this.entityRepository.remove(user);
  }

  async insert(
    email: string,
    name: string,
    passwordHash: string,
  ): Promise<KudogUserEntity> {
    const entity = this.entityRepository.create({ email, name, passwordHash });
    return this.entityRepository.save(entity);
  }

  async count(options?: FindManyOptions<KudogUserEntity>): Promise<number> {
    return this.entityRepository.count(options);
  }

  async changePwd(
    entity: KudogUserEntity,
    passwordHash: string,
  ): Promise<void> {
    entity.passwordHash = passwordHash;
    await this.entityRepository.save(entity);
  }
}
