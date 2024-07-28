import { KudogUser } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { type DataSource, type FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private entityRepository: Repository<KudogUser>;

  constructor(@InjectDataSource() private dataSource: DataSource) {
    this.entityRepository = this.dataSource.getRepository(KudogUser);
  }

  async findById(id: number): Promise<KudogUser | undefined> {
    return this.entityRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<KudogUser | undefined> {
    return this.entityRepository.findOne({ where: { email } });
  }

  async remove(user: KudogUser): Promise<KudogUser> {
    return this.entityRepository.remove(user);
  }

  async insert(
    email: string,
    name: string,
    passwordHash: string,
  ): Promise<KudogUser> {
    const entity = this.entityRepository.create({ email, name, passwordHash });
    return this.entityRepository.save(entity);
  }

  async count(options?: FindManyOptions<KudogUser>): Promise<number> {
    return this.entityRepository.count(options);
  }

  async changePwd(entity: KudogUser, passwordHash: string): Promise<void> {
    entity.passwordHash = passwordHash;
    await this.entityRepository.save(entity);
  }
}
