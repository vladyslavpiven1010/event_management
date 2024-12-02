import { Injectable } from '@nestjs/common';
import { Event } from 'src/core/entities';
import { DataSource } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from './dtos';

/**
 * Class that represents Event service. It contains business logic.
 */
@Injectable()
export class EventService {
  private eventRepository;

  constructor(private dataSource: DataSource) {
    this.eventRepository = this.dataSource.getRepository(Event);
  }

  findAll(
    sortBy: keyof Event,
    sortOrder: 'ASC' | 'DESC',
    filterByCategory: number[],
    filterByTicketPrice: number[]
  ): Promise<Event[]> {
    const query = this.eventRepository.createQueryBuilder('event');

    if (filterByCategory.length > 0) query.andWhere('event.category_id IN (:...categories)', { categories: filterByCategory});
    if (filterByTicketPrice.length > 0) query.andWhere('event.ticket_price BETWEEN :from AND :to', { from: filterByTicketPrice[0], to: filterByTicketPrice[1] });

    return query
      .orderBy(`event.${sortBy}`, sortOrder)
      .innerJoinAndSelect("event.category_id", "category")
      .innerJoinAndSelect("event.user_id", "user")
      .getMany();
  }

  findOne(id: number): Promise<Event | null> {
    return this.eventRepository.createQueryBuilder('event')
    .innerJoinAndSelect("event.category_id", "category")
    .innerJoinAndSelect("event.user_id", "user")
    .where('event.id = :id', { id })
    .getOne();
  }

  async create(user_id: number, event: CreateEventDto): Promise<Event> {
    const newEvent = {
      ...event,
      user_id: user_id,
      created_at: new Date(),
      deleted_at: null
    }
    const result = await this.eventRepository.create(newEvent);
    return await this.eventRepository.save(result);
  }

  async update(id: number, event: UpdateEventDto): Promise<Event> {
    await this.eventRepository.update(id, event);
    return this.eventRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Event> {
    return await this.eventRepository.delete(id);
  }
}
