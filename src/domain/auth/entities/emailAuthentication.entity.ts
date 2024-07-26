import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('email_authentication')
export class EmailAuthenticationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expireAt?: Date;

  @Column({ default: false })
  authenticated: boolean;

  @Column()
  code: string;
}
