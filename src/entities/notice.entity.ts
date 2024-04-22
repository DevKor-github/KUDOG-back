import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity, ScrapEntity } from 'src/entities';

@Entity('notice')
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  writer: string;

  @Column()
  date: string;

  @Column()
  url: string;

  @ManyToOne(() => CategoryEntity, (category) => category.notices)
  category: CategoryEntity;

  @OneToMany(() => ScrapEntity, (scrap) => scrap.notice)
  scraps: ScrapEntity[];

  @Column({ default: 0 })
  view: number;

  @Column({ type: 'bigint' })
  createdAt: number;
}
