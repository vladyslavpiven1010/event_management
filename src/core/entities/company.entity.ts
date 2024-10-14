import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

/**
  * Entity interface that represents user.
*/

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => User, (user) => user.company)
  users: User[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  country_code: string;

  @Column({default: false})
  is_verified: boolean;

  @Column()
  created_at: Date;

  @Column()
  deleted_at?: Date;
}