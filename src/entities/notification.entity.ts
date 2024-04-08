import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { KudogUser } from 'src/entities';
import { NotificationToken } from './notification-token.entity';

@Entity({ name: 'notifications' })
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  /* @JoinColumn({ name: 'notification_token_id', referencedColumnName: 'id' })
  @ManyToOne(() => NotificationToken)
  notification_token: NotificationToken;*/

  @ManyToOne(() => KudogUser, (user) => user.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: KudogUser;

  @Column()
  title: string;

  @Column({ type: 'longtext', nullable: true })
  body: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  date: Date;

  @Column()
  created_By: number;
  // 알림을 생성한 사용자의 ID -> DB에서 조회할 때 혹시 필요할까봐 살려뒀는데 필요 없으면 지워도 돼요.
}
