// import { Entity } from './shared/interfaces';

// /**
//  * Entity interface that represents category.
//  */
// export interface Category extends Entity {
//   name: string;
//   description: string;
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './event.entity';

/**
  * Entity interface that represents category.
*/

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Event, (event) => event.category_id)
  events: Event[];

  @Column()
  name: string;

  @Column()
  description: string;
}