import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/entities';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.provider)
  categories: Category[];
}
