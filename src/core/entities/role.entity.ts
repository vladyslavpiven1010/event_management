import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

/**
  * Entity interface that represents user.
*/

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => User, (user) => user.role_id)
  users: User[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  permissions: string;
}