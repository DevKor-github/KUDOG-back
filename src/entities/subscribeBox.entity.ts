import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KudogUser } from 'src/entities';
import { CategoryPerSubscribeBoxEntity } from './categoryPerSubscribes.entity';

@Entity()
export class SubscribeBox {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KudogUser, (user) => user.subscribeBoxes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: KudogUser;

  @OneToMany(
    () => CategoryPerSubscribeBoxEntity,
    (category) => category.subsribeBox,
  )
  categories: CategoryPerSubscribeBoxEntity[];

  @Column()
  name: string;

  @Column()
  mail: string;
}
