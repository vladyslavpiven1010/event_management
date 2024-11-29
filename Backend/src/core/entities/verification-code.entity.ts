import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

/**
  * Entity interface that represents verification-code.
*/

@Entity()
export class VerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User[];

  @CreateDateColumn()
  created_at: Date;

  @Column()
  expires_at: Date;

  @Column({default: false})
  is_used: boolean;
}