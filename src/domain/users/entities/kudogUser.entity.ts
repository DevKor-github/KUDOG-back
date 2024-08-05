import {
  NotificationEntity,
  NotificationTokenEntity,
  RefreshTokenEntity,
  ScrapBoxEntity,
  SubscribeBoxEntity,
} from 'src/entities';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProviderBookmarkEntity } from '../../category/entities/providerBookmark.entity';

@Entity('kudog_user')
export class KudogUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
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
    () => ProviderBookmarkEntity,
    (ProviderBookmarkEntity) => ProviderBookmarkEntity.user,
  )
  ProviderBookmarkEntitys: ProviderBookmarkEntity[];

  @Column({ default: '18:00' })
  sendTime: string;
}
