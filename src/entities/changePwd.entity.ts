import {
  Column,
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

  @OneToOne(() => changePwdAuthenticationEntity, () => undefined)
  @JoinColumn()
  user: KudogUser;

  @Column()
  expireAt: Date;

  @Column()
  authenticated: boolean;

  @Column()
  code: string;
}
