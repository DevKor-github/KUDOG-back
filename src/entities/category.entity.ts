import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notice } from 'src/entities';
import { Provider } from 'src/entities';
import { CategoryMap } from 'src/enums';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: CategoryMap, default: CategoryMap.공지사항 })
  mappedCategory: CategoryMap;

  @ManyToOne(() => Provider, (provider) => provider.categories)
  provider: Provider;

  @OneToMany(() => Notice, (notice) => notice.category)
  notices: Notice[];
}
