import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { KudogUser, Notice } from 'src/entities';

@Entity()
export class Scrap {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KudogUser, (user) => user.scraps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: KudogUser;

  @ManyToOne(() => Notice, (notice) => notice.scraps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'notice_id' })
  notice: Notice;
}
