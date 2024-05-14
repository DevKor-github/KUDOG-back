import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notice } from 'src/entities';
import { Provider } from 'src/entities';
import { category } from 'src/enums/category.enum';
import { CategoryPerSubscribeBoxEntity } from './categoryPerSubscribes.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: category, default: category.공지사항 })
  category: category;

  @ManyToOne(() => Provider, (provider) => provider.categories)
  provider: Provider;

  @OneToMany(() => Notice, (notice) => notice.category)
  notices: Notice[];

  @OneToMany(
    () => CategoryPerSubscribeBoxEntity,
    (category) => category.category,
  )
  categoryPerUsers: CategoryPerSubscribeBoxEntity[];
}
