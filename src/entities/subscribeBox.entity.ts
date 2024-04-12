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
    (category) => category.subscribeBox,
  )
  categories: CategoryPerSubscribeBoxEntity[];

  @Column()
  name: string;

  @Column()
  mail: string;

  @Column({ default: '18:00' })
  sendTime: string;
}
