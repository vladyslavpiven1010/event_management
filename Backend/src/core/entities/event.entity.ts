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

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
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

  @ManyToOne((type) => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToMany((type) => Ticket, (ticket) => ticket.event_id)
  tickets: Ticket[];

  @ManyToOne((type) => Category, (category) => category.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'category_id' })
  category_id: Category;

  @Column({ nullable: true })
  description?: string;

  @Column()
  ticket_count: number;

  @Column()
  ticket_price: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column()
  event_date: Date;
}