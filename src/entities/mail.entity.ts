import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KudogUser } from 'src/entities';

@Entity()
export class Mail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  portalEmail: string;

  @Column()
  subscriberEmail: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => KudogUser, (user) => user.mail, { onDelete: 'CASCADE' })
  user: KudogUser;
}
