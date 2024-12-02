import { Event, Ticket } from 'src/core/entities';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateTicketDto, UpdateTicketDto } from './dtos';

/**
 * Class that represents ticket service. It contains business logic.
 */
@Injectable()
export class TicketService {
  private ticketRepository;
  private eventRepository;

  constructor(private dataSource: DataSource) {
    this.eventRepository = this.dataSource.getRepository(Event);
    this.ticketRepository = this.dataSource.getRepository(Ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .innerJoinAndSelect("ticket.event_id", "event")
      .innerJoinAndSelect("ticket.user_id", "user")
      .getMany();
  }

  findOne(id: number): Promise<Ticket | null> {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .innerJoinAndSelect("ticket.event_id", "event")
      .innerJoinAndSelect("ticket.user_id", "user")
      .where('ticket.id = :id', { id: id })
      .getOne();
  }

  getTicketCount(event_id: number): Promise<number> {
    return this.ticketRepository
        .createQueryBuilder("ticket")
        .where("ticket.event_id = :event_id", { event_id: event_id })
        .getCount();
  }

  async create(userId: number, ticket: CreateTicketDto): Promise<Ticket> {
    const newTicket = {
      user_id: userId,
      event_id: ticket.event_id,
      created_at: new Date(),
      deleted_at: null
    }

    const result = await this.ticketRepository.create(newTicket);
    return await this.ticketRepository.save(result);
  }

  async update(id: number, ticket: UpdateTicketDto): Promise<Ticket> {
    await this.ticketRepository.update(id, ticket);
    return this.ticketRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
