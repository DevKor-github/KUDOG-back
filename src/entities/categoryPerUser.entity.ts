import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import Category from './category.entity';
import { ApiTags, ApiProperty } from '@nestjs/swagger';

@ApiTags('categories')
@Entity()
class CategoryPerUser {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'entitiy for identify the category-per-user' })
  id: number;

  @ManyToOne(() => User, (user) => user.categoryPerUsers)
  @ApiProperty({ type: User, description: 'user related to category-per-user' })
  user: User;

  @ManyToOne(() => Category, (category) => category.categoryPerUsers)
  @ApiProperty({
    type: Category,
    description: 'category related to category-per-user',
  })
  category: Category;
}

export default CategoryPerUser;
