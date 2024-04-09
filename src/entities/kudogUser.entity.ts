import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ScrapBox, SubscribeBox } from 'src/entities';
import { FcmToken } from './fcmtoken.entity';
@Entity()
export class KudogUser {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ScrapBox, (scrapBox) => scrapBox.user)
  scrapBoxes: ScrapBox[];

  @OneToMany(() => SubscribeBox, (subscribeBox) => subscribeBox.user)
  subscribeBoxes: SubscribeBox[];

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  name: string;
  @OneToMany(() => FcmToken, (fcmToken) => fcmToken.user)
  fcmTokens: FcmToken[];
}
