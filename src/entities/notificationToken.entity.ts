import { KudogUser } from 'src/entities';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class NotificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KudogUser, (user) => user.notificationTokens, {
    onDelete: 'CASCADE',
  })
  user: KudogUser;

  @RelationId((notificationToken: NotificationToken) => notificationToken.user)
  userId: number;

  @Column()
  token: string;

  @Column({ default: true })
  isActive: boolean;
}
