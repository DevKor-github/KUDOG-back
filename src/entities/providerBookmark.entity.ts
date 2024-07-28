import { KudogUser, ProviderEntity } from 'src/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('provider_bookmark')
export class ProviderBookmark {
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
    () => KudogUser,
    (user) => user.providerBookmarks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: KudogUser;
  @PrimaryColumn({ name: 'user_id', type: 'integer' })
  userId: number;
}
