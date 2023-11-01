import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CategoryPerUser from './categoryPerUser.entity';
import MailEntity from './mail.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  categoryPerUsers: CategoryPerUser[];

  @OneToOne(() => MailEntity, (mail) => mail.user)
  @JoinColumn()
  mail: MailEntity;

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
