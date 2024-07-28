import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Notice } from 'src/entities';
import { ScrapBoxEntity } from './scrapBox.entity';

@Entity('scrap')
export class ScrapEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ScrapBoxEntity,
    (scrapBox) => scrapBox.scraps,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'scrap_box_id' })
  scrapBox: ScrapBoxEntity;

  @ManyToOne(
    () => Notice,
    (notice) => notice.scraps,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'notice_id' })
  notice: Notice;

  @RelationId((scrap: ScrapEntity) => scrap.notice)
  @Column({ name: 'notice_id' })
  noticeId: number;
}
