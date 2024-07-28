import { KudogUser, ScrapEntity } from 'src/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('scrap_box')
export class ScrapBoxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => KudogUser,
    (user) => user.scrapBoxes,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: KudogUser;

  @RelationId((scrapBox: ScrapBoxEntity) => scrapBox.user)
  @Column({ name: 'user_id' })
  userId: number;

  @OneToMany(
    () => ScrapEntity,
    (scrap) => scrap.scrapBox,
  )
  scraps: ScrapEntity[];

  @Column({ default: '나의 스크랩함' })
  name: string;

  @Column({ default: '' })
  description: string;
}
