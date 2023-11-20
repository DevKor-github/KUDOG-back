import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KudogUser } from './kudogUser.entity';

@Entity('change_pwd_authentication')
export class ChangePwdAuthenticationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ChangePwdAuthenticationEntity, () => undefined)
  @JoinColumn()
  user: KudogUser;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expireAt?: Date;

  @Column()
  authenticated: boolean;

  @Column()
  code: string;
}
