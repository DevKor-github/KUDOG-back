import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { KudogUser, Category } from 'src/entities';
@Entity()
export class CategoryPerUser {
  @ManyToOne(() => KudogUser, (user) => user.categoryPerUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: KudogUser;
  @PrimaryColumn({ name: 'user_id', type: 'integer' })
  user_id: number;

  @ManyToOne(() => Category, (category) => category.categoryPerUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @PrimaryColumn({ name: 'category_id', type: 'integer' })
  category_id: number;
}
