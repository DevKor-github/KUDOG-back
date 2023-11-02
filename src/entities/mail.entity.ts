import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity()
class MailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  portalEmail: string;

  @Column()
  subscriberEmail: string;

  @OneToOne(() => User, (user) => user.mail)
  user: User;
}

export default MailEntity;
