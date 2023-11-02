import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity, Category } from 'src/entities';
@Entity()
export class CategoryPerUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.categoryPerUsers)
  user: UserEntity;

  @ManyToOne(() => Category, (category) => category.categoryPerUsers)
  category: Category;
}
