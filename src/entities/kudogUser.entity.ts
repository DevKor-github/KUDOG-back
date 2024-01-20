import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryPerUser, Mail, Scrap } from 'src/entities';

@Entity()
export class KudogUser {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  categoryPerUsers: CategoryPerUser[];

  @OneToMany(() => Scrap, (scrap) => scrap.user)
  scraps: Scrap[];

  @OneToOne(() => Mail, (mail) => mail.user)
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
