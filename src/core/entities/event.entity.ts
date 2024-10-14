// import { Entity } from './shared/interfaces';

// /**
//  * Entity interface that represents event.
//  */
// export interface Event extends Entity {
//   user_id: number;
//   category_id: number;
//   name: string;
//   description?: string;
//   ticket_count: number;
//   ticket_price: number;
//   lat: number;
//   lng: number;
//   created_at: Date;
//   deleted_at?: Date;
//   event_date: Date;
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

/**
  * Entity interface that represents entity.
*/

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  user_id: number;

  @OneToMany((type) => Ticket, (ticket) => ticket.event_id)
  tickets: Ticket[];

  @ManyToOne((type) => Category, (category) => category.id)
  category: Category;

  @Column()
  description?: string;

  @Column()
  ticket_count: number;

  @Column()
  ticket_price: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  created_at: Date;

  @Column()
  deleted_at?: Date;

  @Column()
  event_date: Date;
}