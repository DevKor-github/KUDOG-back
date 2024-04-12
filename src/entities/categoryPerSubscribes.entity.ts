import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CategoryEntity, SubscribeBoxEntity } from 'src/entities';
@Entity('category_per_subscribeBox')
export class CategoryPerSubscribeBoxEntity {
  @ManyToOne(
    () => SubscribeBoxEntity,
    (subscribeBox) => subscribeBox.categories,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'box_id' })
  subscribeBox: SubscribeBoxEntity;
  @PrimaryColumn({ name: 'box_id', type: 'integer' })
  boxId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.categoryPerUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
  @PrimaryColumn({ name: 'category_id', type: 'integer' })
  categoryId: number;
}
