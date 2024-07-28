import { KudogUser } from 'src/entities';
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
    () => KudogUser,
    (user) => user.refreshTokens,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'userId' })
  user!: KudogUser;

  @RelationId((refreshToken: RefreshTokenEntity) => refreshToken.user)
  userId!: number;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  token!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
