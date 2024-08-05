import { KudogUserEntity } from '@/domain/users/entities/kudogUser.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProviderEntity } from './provider.entity';

@Entity('provider_bookmark')
export class ProviderBookmarkEntity {
  @ManyToOne(
    () => ProviderEntity,
    (provider) => provider.bookmarks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'provider_id' })
  provider: ProviderEntity;
  @PrimaryColumn({ name: 'provider_id', type: 'integer' })
  providerId: number;

  @ManyToOne(
    () => KudogUserEntity,
    (user) => user.ProviderBookmarkEntitys,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: KudogUserEntity;
  @PrimaryColumn({ name: 'user_id', type: 'integer' })
  userId: number;
}
