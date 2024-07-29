import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { KudogUser } from '../../../entities/kudogUser.entity';

@Entity('change_pwd_authentication')
export class ChangePwdAuthenticationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => KudogUser,
    () => undefined,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'userId' })
  user!: KudogUser;
  @RelationId((entity: ChangePwdAuthenticationEntity) => entity.user)
  userId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ default: false })
  authenticated!: boolean;

  @Index()
  @Column()
  code!: string;
}
