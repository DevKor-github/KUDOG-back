import { CategoryEntity } from 'src/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProviderBookmark } from './providerBookmark.entity';

@Entity('provider')
export class ProviderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => CategoryEntity,
    (category) => category.provider,
  )
  categories: CategoryEntity[];

  @OneToMany(
    () => ProviderBookmark,
    (bookmark) => bookmark.provider,
  )
  bookmarks: ProviderBookmark[];
}
