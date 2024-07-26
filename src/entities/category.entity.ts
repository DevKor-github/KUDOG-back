import { Notice } from 'src/entities';
import { ProviderEntity } from 'src/entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryPerSubscribeBoxEntity } from './categoryPerSubscribes.entity';

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
  provider: ProviderEntity;

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
