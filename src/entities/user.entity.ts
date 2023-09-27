import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CategoryPerUser from './categoryPerUser.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  categoryPerUsers: CategoryPerUser[];

  @Column({ unique: true })
  email: string;

  @Column()
  subscribeMail: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  name: string;

  @Column()
  studentId: number;

  @Column()
  grade: number;

  @Column()
  major: string;
}

export default User;
