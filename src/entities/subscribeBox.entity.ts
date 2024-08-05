import { KudogUserEntity } from 'src/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { CategoryPerSubscribeBoxEntity } from '../domain/subscribe/entities/categoryPerSubscribes.entity';

@Entity('subscribe_box')
export class SubscribeBoxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => KudogUserEntity,
    (user) => user.subscribeBoxes,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: KudogUserEntity;
  @Column()
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
