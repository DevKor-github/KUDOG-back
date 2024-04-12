import { KudogUser } from 'src/entities';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KudogUser, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  user: KudogUser;

  @RelationId((refreshToken: RefreshToken) => refreshToken.user)
  userId: number;

  @Column()
  token: string;
}
