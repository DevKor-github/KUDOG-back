import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProviderBookmarkEntity } from './providerBookmark.entity';

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
    () => ProviderBookmarkEntity,
    (bookmark) => bookmark.provider,
  )
  bookmarks: ProviderBookmarkEntity[];
}
