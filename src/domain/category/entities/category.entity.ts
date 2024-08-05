import { Notice } from '@/domain/notice/entities/notice.entity';
import { CategoryPerSubscribeBoxEntity } from '@/domain/subscribe/entities/categoryPerSubscribes.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { ProviderEntity } from './provider.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(
    () => ProviderEntity,
    (provider) => provider.categories,
  )
  @JoinColumn({ name: 'providerId' })
  provider: ProviderEntity;

  @Column()
  @RelationId((entity: CategoryEntity) => entity.provider)
  providerId: number;

  @OneToMany(
    () => Notice,
    (notice) => notice.category,
  )
  notices: Notice[];

  @OneToMany(
    () => CategoryPerSubscribeBoxEntity,
    (category) => category.category,
  )
  categoryPerUsers: CategoryPerSubscribeBoxEntity[];
}
