// import { Entity } from './shared/interfaces';

// /**
//  * Entity interface that represents user.
//  */
// export interface User extends Entity {
//   username: string;
//   email: string;

//   created_at: Date;
//   deleted_at: Date;
//   is_verified: boolean;
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { Event } from './event.entity';
import { Ticket } from './ticket.entity';
import { VerificationCode } from './verification-code.entity';
import { Company } from './company.entity';

/**
  * Entity interface that represents category.
*/

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role, (role) => role.id)
  role: Role;

  @ManyToOne((type) => Company, (company) => company.id)
  company: Company;

  @OneToMany((type) => Event, (event) => event.id)
  events: Event[];

  @OneToMany((type) => Ticket, (ticket) => ticket.event_id)
  tickets: Ticket[];

  @OneToMany((type) => VerificationCode, (verification_code) => verification_code.users)
  verification_code: VerificationCode[];

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column()
  bio?: string;

  @Column()
  birth_date?: string;

  @Column()
  gender?: string;

  @Column()
  created_at: Date;

  @Column()
  deleted_at?: Date;
}