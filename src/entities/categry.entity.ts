import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CategoryPerUser from './categoryPerUser.entity';

@Entity('category')
class Category {
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

export default Category;
