import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NotificationToken } from './notification-token.entity';

@Entity({ name: 'notifications' })
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'notification_token_id', referencedColumnName: 'id' })
  @ManyToOne(() => NotificationToken)
  notification_token: NotificationToken;

  @Column()
  title: string;

  @Column({ type: 'longtext', nullable: true })
  body: any;

  @Column({
    default: 'ACTIVE',
  })
  status: string;

  @Column()
  created_By: number; // 알림을 생성한 사용자의 ID
}
