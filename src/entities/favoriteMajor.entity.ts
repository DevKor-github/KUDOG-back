import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { KudogUser } from 'src/entities';

@Entity('favoriteMajor')
export class favoriteMajorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => KudogUser, (user) => user.favorites)
  @JoinColumn({ name: 'favorite_id' })
  user: KudogUser;

  /* @ManyToOne(() => KudogUser, { lazy: true })
  KudogUser: Promise<KudogUser>; */
}
