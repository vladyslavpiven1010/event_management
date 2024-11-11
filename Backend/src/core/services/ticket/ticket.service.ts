import { Event, Ticket } from 'src/core/entities';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto, UpdateTicketDto } from './dtos';

/**
 * Class that represents ticket service. It contains business logic.
 */
@Injectable()
export class TicketService {
  private ticketRepository;
  private eventRepository;

  constructor(private dataSource: DataSource) {
    this.ticketRepository = this.dataSource.getRepository(Ticket);
    this.eventRepository = this.dataSource.getRepository(Event);
  }

  // constructor(
  //   @InjectRepository(Ticket)
  //   private ticketRepository: Repository<Ticket>,

  //   @InjectRepository(Event)
  //   private eventRepository: Repository<Event>,
  // ) {}

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
      .getOne({ id });
  }

  async create(ticket: CreateTicketDto): Promise<Ticket> {
    const event: Event = await this.eventRepository
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.tickets", "ticket")
      .where("event.id = :event_id", { event_id: ticket.event_id })
      .getOne();

    const ticketCount: number = await this.ticketRepository
      .createQueryBuilder("ticket")
      .where("ticket.event_id = :event_id", { event_id: ticket.event_id })
      .getCount();

    if (ticketCount >= event.ticket_count) throw new BadRequestException('All tickets was sold');
    const result = await this.ticketRepository.create(ticket);
    return await this.ticketRepository.save(result);
  }

  async update(id: number, ticket: UpdateTicketDto): Promise<void> {
    await this.ticketRepository.update(id, ticket);
    return this.ticketRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
  // constructor(public _dataProvider: IDataProvider) {}

  // @Transaction()
  // public async createTicket(ticketDto: CreateTicketDto, @DataClient() dataClient?: IDataClient): Promise<Ticket> {
  //   const countTicket = await dataClient.ticket.countTicket(ticketDto.ticket_id);
  //   if (countTicket >= 50) throw new BadRequestException('All tickets was sold');
  //   const ticketDraft: Ticket = {
  //     ...ticketDto,
  //     uuid: uuidv4()
  //   };
  //   const ticket = await dataClient.ticket.create(ticketDraft);
  //   return ticket;
  // }

  // @Transaction()
  // public async getTicket(ticketId: number, @DataClient() dataClient?: IDataClient): Promise<Ticket> {
  //   const ticket = await dataClient.ticket.findById(ticketId);
  //   if (!ticket) throw new NotFoundException('There is no such ticket with this ID');
  //   return ticket;
  // }

  // @Transaction()
  // public async getTicketByOption(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Ticket> {
  //   const ticket = await dataClient.ticket.findOne(options)
  //   if (!ticket) throw new NotFoundException('There is no such ticket with this option');
  //   return ticket;
  // }

  // @Transaction()
  // public async getTickets(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Ticket[]> {
  //   const ticket = await dataClient.ticket.findAll(options);
  //   if (!ticket) throw new NotFoundException('There is no such ticket with this options');
  //   return ticket;
  // }

  // @Transaction()
  // public async updateTicket(ticketId: number, ticketDto: UpdateTicketDto, @DataClient() dataClient?: IDataClient): Promise<Ticket> {
  //   const ticket = await dataClient.ticket.updateById(ticketId, ticketDto);
  //   if (!ticket) throw new NotFoundException('There is no such ticket with this ID');
  //   return ticket;
  // }

  // @Transaction()
  // public async updateTickets(options: QueryOptions, ticketDto: UpdateTicketDto, @DataClient() dataClient?: IDataClient): Promise<Ticket[]> {
  //   const ticket = await dataClient.ticket.updateAll(options, ticketDto);
  //   if (!ticket) throw new NotFoundException('There is no such ticket with this options');
  //   return ticket;
  // }
}
