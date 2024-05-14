import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { KudogUser } from 'src/entities';

@Entity('favoriteMajor')
export class favoriteMajor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => KudogUser, (user) => user.favorites)
  user: KudogUser;

  /* @ManyToOne(() => KudogUser, { lazy: true })
  KudogUser: Promise<KudogUser>; */
}
