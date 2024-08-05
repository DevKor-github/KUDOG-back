import { KudogUserEntity } from '@/domain/users/entities/kudogUser.entity';
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

@Entity('change_pwd_authentication')
export class ChangePwdAuthenticationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => KudogUserEntity,
    () => undefined,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'userId' })
  user!: KudogUserEntity;
  @Column()
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
