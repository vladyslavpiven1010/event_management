/**
 * Entity interface that represents ticket.
 */
// export interface Ticket {
//   user_id: number;
//   event_id: number;
//   id: string;
//   created_at: Date;
//   deleted_at: Date;
// }

import { Entity, ManyToOne, CreateDateColumn, DeleteDateColumn, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

/**
  * Entity interface that represents ticket.
*/

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @ManyToOne((type) => Event, (event) => event.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'event_id' })
  event_id: Event;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}