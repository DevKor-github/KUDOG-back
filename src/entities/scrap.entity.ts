import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Notice } from 'src/entities';
import { ScrapBox } from './scrapBox.entity';

@Entity()
export class Scrap {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ScrapBox, (scrapBox) => scrapBox.scraps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scrap_box_id' })
  scrapBox: ScrapBox;

  @ManyToOne(() => Notice, (notice) => notice.scraps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'notice_id' })
  notice: Notice;
}
