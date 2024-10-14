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

import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

/**
  * Entity interface that represents ticket.
*/

@Entity()
export class Ticket {
  @PrimaryColumn()
  @ManyToOne((type) => User, (user) => user.id)
  user_id: User;

  @PrimaryColumn()
  @ManyToOne((type) => Event, (event) => event.id)
  event_id: Event;

  @Column()
  created_at: Date;

  @Column()
  deleted_at?: Date;
}