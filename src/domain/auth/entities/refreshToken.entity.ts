import { KudogUser } from 'src/entities';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  JoinColumn,
} from 'typeorm';

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => KudogUser,
    (user) => user.refreshTokens,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'userId' })
  user: KudogUser;

  @RelationId((refreshToken: RefreshTokenEntity) => refreshToken.user)
  userId: number;

  @Column()
  token: string;
}
