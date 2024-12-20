import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Event } from './event.entity';
import { Ticket } from './ticket.entity';
import { VerificationCode } from './verification-code.entity';
import { Company } from './company.entity';
import { UserNotification } from './user-notification.entity';

/**
  * Entity interface that represents category.
*/

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role, (role) => role.id, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'role_id' })
  role_id: Role;

  @ManyToOne((type) => Company, (company) => company.id, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'company_id' })
  company_id: Company;

  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.user,
  )
  userNotifications: UserNotification[];

  @OneToMany((type) => Event, (event) => event.id)
  events: Event[];

  @OneToMany((type) => Ticket, (ticket) => ticket.event_id)
  tickets: Ticket[];

  @OneToMany((type) => VerificationCode, (verification_code) => verification_code.user_id)
  verification_code: VerificationCode[];

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  birth_date?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ default: false })
  is_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}