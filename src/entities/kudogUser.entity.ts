import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryPerUser, Mail } from 'src/entities';

@Entity()
export class KudogUser {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  categoryPerUsers: CategoryPerUser[];

  @OneToOne(() => Mail, (mail) => mail.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  mail: Mail;

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
