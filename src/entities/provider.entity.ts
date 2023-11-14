import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/entities';
//CRUD의 Read 구현 : 데이터 조회 (GET). provider 목록을 get하기.

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.provider)
  categories: Category[];
}
