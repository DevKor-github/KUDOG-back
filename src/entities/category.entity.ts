import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryPerUser } from 'src/entities';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @OneToMany(
    () => CategoryPerUser,
    (categoryPerUser) => categoryPerUser.category,
  )
  categoryPerUsers: CategoryPerUser[];
}
