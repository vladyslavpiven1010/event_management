import { Injectable } from '@nestjs/common';
import { Event } from 'src/core/entities';
import { DataSource } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from './dtos';
import {NotificationService} from '../notification/notification.service'

/**
 * Class that represents Event service. It contains business logic.
 */
@Injectable()
export class EventService {
  private eventRepository;

  constructor(private dataSource: DataSource, private readonly notificationService: NotificationService,) {
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

  findAllByUser(
    userId: number
  ): Promise<Event[]> {
    const query = this.eventRepository.createQueryBuilder('event');

    return query
      .innerJoinAndSelect("event.category_id", "category")
      .innerJoinAndSelect("event.user_id", "user")
      .andWhere("event.user_id = :id", {id: userId})
      .getMany();
  }

  async findAllByCompany(companyId: number): Promise<Event[]> {
    const query = this.eventRepository.createQueryBuilder('event');
  
    return query
      .innerJoinAndSelect('event.user_id', 'user')
      .innerJoinAndSelect('event.category_id', 'category')
      .where('user.company_id = :companyId', { companyId })
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

  async notifyUserAboutMostFrequentCategoryEvents(
    userId: number,
  ): Promise<void> {
    const userCategories = await this.eventRepository
      .createQueryBuilder('event')
      .innerJoin('event.category_id', 'category')
      .innerJoin('event.user_id', 'user')
      .select('user.id', 'userId')
      .addSelect('category.id', 'categoryId')
      .where('user.id = :userId', { userId })
      .getRawMany();

    const categoryCountMap = new Map<number, number>();
    userCategories.forEach(({ categoryId }) => {
      categoryCountMap.set(
        categoryId,
        (categoryCountMap.get(categoryId) || 0) + 1,
      );
    });

    let mostFrequentCategoryId: number | null = null;
    let highestCount = 0;
    categoryCountMap.forEach((count, categoryId) => {
      if (count > highestCount) {
        mostFrequentCategoryId = categoryId;
        highestCount = count;
      }
    });

    if (mostFrequentCategoryId === null) {
      return;
    }

    const now = new Date();
    const newEvents = await this.eventRepository
      .createQueryBuilder('event')
      .innerJoinAndSelect('event.category_id', 'category')
      .where('event.category_id = :categoryId', {
        categoryId: mostFrequentCategoryId,
      })
      .andWhere('event.event_date > :now', { now })
      .getMany();

    if (newEvents.length > 0) {
      const notificationMessage = `Hello! New events in your favorite category: ${newEvents
        .map(
          (event) =>
            `"${event.description}" on ${event.event_date.toDateString()}`,
        )
        .join(', ')}`;
      await this.notificationService.sendNotificationToUser(
        userId,
        notificationMessage,
        3
      );
    }
  }
}
