import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/entities';

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

  @Column({ default: 0 })
  view: number;
}
