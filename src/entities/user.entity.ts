import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryPerUser, MailEntity } from 'src/entities';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  categoryPerUsers: CategoryPerUser[];

  @OneToOne(() => MailEntity, (mail) => mail.user)
  @JoinColumn()
  mail: MailEntity;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  name: string;

  @Column()
  studentId: string;

  @Column()
  grade: number;

  @Column()
  major: string;
}
