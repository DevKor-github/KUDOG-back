import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category, SubscribeBox } from 'src/entities';
@Entity('category_per_subscribeBox')
export class CategoryPerSubscribeBoxEntity {
  @ManyToOne(() => SubscribeBox, (subscribeBox) => subscribeBox.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'box_id' })
  subsribeBox: SubscribeBox;
  @PrimaryColumn({ name: 'box_id', type: 'integer' })
  boxId: number;

  @ManyToOne(() => Category, (category) => category.categoryPerUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @PrimaryColumn({ name: 'category_id', type: 'integer' })
  category_id: number;
}
