import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { KudogUser, Scrap } from 'src/entities';

@Entity()
export class ScrapBox {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KudogUser, (user) => user.scrapBoxes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: KudogUser;

  @RelationId((scrapBox: ScrapBox) => scrapBox.user)
  @Column({ name: 'user_id' })
  userId: number;

  @OneToMany(() => Scrap, (scrap) => scrap.scrapBox)
  scraps: Scrap[];

  @Column({ default: '나의 스크랩함' })
  name: string;

  @Column({ default: '' })
  description: string;
}
