import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';

/**
  * Entity interface that represents user.
*/

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => User, (user) => user.company_id)
  users: User[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  country_code: string;

  @Column({default: false})
  is_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}