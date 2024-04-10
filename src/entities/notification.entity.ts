import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { KudogUser } from 'src/entities';

@Entity({ name: 'notifications' })
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ default: false })
  isRead: boolean;
}
