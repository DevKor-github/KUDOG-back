import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  ScrapBoxEntity,
  SubscribeBoxEntity,
  NotificationEntity,
  NotificationTokenEntity,
  RefreshTokenEntity,
} from 'src/entities';
import { ProviderBookmark } from './providerBookmark.entity';

@Entity('kudog_user')
export class KudogUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @OneToMany(
    () => ScrapBoxEntity,
    (scrapBox) => scrapBox.user,
  )
  scrapBoxes: ScrapBoxEntity[];

  @OneToMany(
    () => SubscribeBoxEntity,
    (subscribeBox) => subscribeBox.user,
  )
  subscribeBoxes: SubscribeBoxEntity[];

  @OneToMany(
    () => NotificationEntity,
    (notification) => notification.user,
  )
  notifications: Notification[];

  @OneToMany(
    () => NotificationTokenEntity,
    (notificationToken) => notificationToken.user,
  )
  notificationTokens: NotificationTokenEntity[];

  @OneToMany(
    () => RefreshTokenEntity,
    (refreshToken) => refreshToken.user,
  )
  refreshTokens: RefreshTokenEntity[];

  @OneToMany(
    () => ProviderBookmark,
    (providerBookmark) => providerBookmark.user,
  )
  providerBookmarks: ProviderBookmark[];

  @Column({ default: '18:00' })
  sendTime: string;
}
