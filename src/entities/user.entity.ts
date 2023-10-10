import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CategoryPerUser from './categoryPerUser.entity';
import { ApiTags, ApiProperty } from '@nestjs/swagger';

@ApiTags('users')
@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'entity for identify the user' })
  userId: number;

  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  @ApiProperty({type: CategoryPerUser, description: 'Category-per-user related to user',
  })
  categoryPerUsers: CategoryPerUser[];
}

export default User;
