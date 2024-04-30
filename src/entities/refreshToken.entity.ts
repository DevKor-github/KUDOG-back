import { KudogUser } from 'src/entities';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KudogUser, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  user: KudogUser;

  @RelationId((refreshToken: RefreshTokenEntity) => refreshToken.user)
  userId: number;

  @Column()
  token: string;
}
