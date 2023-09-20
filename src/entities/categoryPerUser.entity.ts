import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import Category from './categry.entity';

@Entity()
class CategoryPerUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.categoryPerUsers)
  user: User;

  @ManyToOne(() => Category, (category) => category.categoryPerUsers)
  category: Category;
}

export default CategoryPerUser;
