import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notice } from 'src/entities';
import { ProviderEntity } from 'src/entities';
import { CategoryMap } from 'src/enums';
import { CategoryPerSubscribeBoxEntity } from './categoryPerSubscribes.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: CategoryMap, default: CategoryMap.공지사항 })
  mappedCategory: CategoryMap;

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
