import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CategoryPerUser from './categoryPerUser.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
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
