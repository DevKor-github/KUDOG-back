import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/entities';

@Entity()
export class MailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  portalEmail: string;

  @Column()
  subscriberEmail: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => UserEntity, (user) => user.mail)
  user: UserEntity;
}
