import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @OneToMany(() => Scrap, (scrap) => scrap.scrapBox)
  scraps: Scrap[];

  @Column()
  name: string;

  @Column()
  description: string;
}
