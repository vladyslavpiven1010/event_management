import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('token')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  access_token: string;

  @Column({ unique: true })
  refresh_token: string;

  @Column({ default: true, nullable: true })
  is_valid: boolean;

  @ManyToOne(() => User, { 
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}