//사용자에게 푸시 알림을 보낼 때 사용되는 고유한 식별 token
import { KudogUser } from 'src/entities/KudogUser.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notification_tokens' })
export class NotificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(() => KudogUser)
  user: KudogUser;

  @Column()
  device_type: string;

  @Column()
  notification_token: string;

  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
