import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryPerUser, Notice } from 'src/entities';
import { Provider } from 'src/entities';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Provider, (provider) => provider.categories)
  provider: Provider;

  @OneToMany(() => Notice, (notice) => notice.category)
  notices: Notice[];

  @OneToMany(
    () => CategoryPerUser,
    (categoryPerUser) => categoryPerUser.category,
  )
  categoryPerUsers: CategoryPerUser[];
}
