import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryPerUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.categoryPerUsers)
  user: User;

  @ManyToOne(() => Category, (category) => category.categoryPerUsers)
  category: Category;
}
