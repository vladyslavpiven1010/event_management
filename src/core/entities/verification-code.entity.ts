import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

/**
  * Entity interface that represents verification-code.
*/

@Entity()
export class VerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  users: User[];

  @Column()
  created_at: Date;

  @Column()
  expires_at: Date;

  @Column({default: false})
  is_used: Date;
}