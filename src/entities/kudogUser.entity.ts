import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ScrapBox, SubscribeBox } from 'src/entities';

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
}
