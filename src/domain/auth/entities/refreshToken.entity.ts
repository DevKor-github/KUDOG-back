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

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => KudogUserEntity,
    (user) => user.refreshTokens,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'userId' })
  user!: KudogUserEntity;
  @Column()
  @RelationId((refreshToken: RefreshTokenEntity) => refreshToken.user)
  userId!: number;

  @Index()
  @Column()
  token!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
