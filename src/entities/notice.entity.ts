import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category, Scrap } from 'src/entities';

@Entity()
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

  @ManyToOne(() => Category, (category) => category.notices)
  category: Category;

  @OneToMany(() => Scrap, (scrap) => scrap.notice)
  scraps: Scrap[];

  @Column({ default: 0 })
  view: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;
}
