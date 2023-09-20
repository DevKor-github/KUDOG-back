import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CategoryPerUser from './categoryPerUser.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  categoryPerUsers: CategoryPerUser[];
}

export default User;
