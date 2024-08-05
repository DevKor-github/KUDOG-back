import { KudogUserEntity } from 'src/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('notification_token')
export class NotificationTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => KudogUserEntity,
    (user) => user.notificationTokens,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'userId' })
  user: KudogUserEntity;
  @Column()
  @RelationId(
    (notificationToken: NotificationTokenEntity) => notificationToken.user,
  )
  userId: number;

  @Column()
  token: string;

  @Column({ default: true })
  isActive: boolean;
}
