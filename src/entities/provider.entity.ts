import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from 'src/entities';
//CRUD의 Read 구현 : 데이터 조회 (GET). provider 목록을 get하기.

@Entity('provider')
export class ProviderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CategoryEntity, (category) => category.provider)
  categories: CategoryEntity[];
}
