import { KudogUser } from 'src/entities';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('notification_token')
export class NotificationTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KudogUser, (user) => user.notificationTokens, {
    onDelete: 'CASCADE',
  })
  user: KudogUser;

  @RelationId(
    (notificationToken: NotificationTokenEntity) => notificationToken.user,
  )
  userId: number;

  @Column()
  token: string;

  @Column({ default: true })
  isActive: boolean;
}
