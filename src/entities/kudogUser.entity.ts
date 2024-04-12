import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  ScrapBox,
  SubscribeBox,
  Notifications,
  NotificationToken,
  RefreshToken,
} from 'src/entities';

@Entity()
export class KudogUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @OneToMany(() => ScrapBox, (scrapBox) => scrapBox.user)
  scrapBoxes: ScrapBox[];

  @OneToMany(() => SubscribeBox, (subscribeBox) => subscribeBox.user)
  subscribeBoxes: SubscribeBox[];

  @OneToMany(() => Notifications, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(
    () => NotificationToken,
    (notificationToken) => notificationToken.user,
  )
  notificationTokens: NotificationToken[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
