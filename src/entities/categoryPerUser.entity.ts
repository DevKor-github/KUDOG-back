import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { KudogUser, Category } from 'src/entities';
@Entity()
export class CategoryPerUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KudogUser, (user) => user.categoryPerUsers)
  user: KudogUser;

  @ManyToOne(() => Category, (category) => category.categoryPerUsers)
  category: Category;
}
