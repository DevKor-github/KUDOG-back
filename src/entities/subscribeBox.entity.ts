import { KudogUser } from 'src/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { CategoryPerSubscribeBoxEntity } from './categoryPerSubscribes.entity';

@Entity('subscribe_box')
export class SubscribeBoxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => KudogUser,
    (user) => user.subscribeBoxes,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: KudogUser;

  @RelationId((subscribeBox: SubscribeBoxEntity) => subscribeBox.user)
  userId: number;

  @OneToMany(
    () => CategoryPerSubscribeBoxEntity,
    (category) => category.subscribeBox,
  )
  categories: CategoryPerSubscribeBoxEntity[];

  @Column()
  name: string;

  @Column()
  mail: string;
}
