import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('email_authentication')
export class EmailAuthenticationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ default: false })
  authenticated!: boolean;

  @Index()
  @Column()
  code!: string;
}
