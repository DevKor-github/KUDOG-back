import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { KudogUser } from './kudogUser.entity';

@Entity()
export class FcmToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => KudogUser, (user) => user.fcmTokens)
  user: KudogUser;
}
