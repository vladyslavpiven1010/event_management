import { IDataClient, IDataProvider } from 'src/core/abstracts';
import { Ticket } from 'src/core/entities';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataClient, ITransactable, Transaction } from '../../utils';
import { CreateTicketDto, UpdateTicketDto } from './dtos';
import { QueryOptions } from 'src/core/abstracts';
import { v4 as uuidv4 } from 'uuid';

/**
 * Class that represents ticket service. It contains business logic.
 */
@Injectable()
export class TicketService implements ITransactable {
  constructor(public _dataProvider: IDataProvider) {}

  @Transaction()
  public async createTicket(ticketDto: CreateTicketDto, @DataClient() dataClient?: IDataClient): Promise<Ticket> {
    const countTicket = await dataClient.ticket.countTicket(ticketDto.event_id);
    if (countTicket >= 50) throw new BadRequestException('All tickets was sold');
    const ticketDraft: Ticket = {
      ...ticketDto,
      uuid: uuidv4()
    };
    const ticket = await dataClient.ticket.create(ticketDraft);
    return ticket;
  }

  @Transaction()
  public async getTicket(ticketId: number, @DataClient() dataClient?: IDataClient): Promise<Ticket> {
    const ticket = await dataClient.ticket.findById(ticketId);
    if (!ticket) throw new NotFoundException('There is no such ticket with this ID');
    return ticket;
  }

  @Transaction()
  public async getTicketByOption(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Ticket> {
    const ticket = await dataClient.ticket.findOne(options)
    if (!ticket) throw new NotFoundException('There is no such ticket with this option');
    return ticket;
  }

  @Transaction()
  public async getTickets(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Ticket[]> {
    const ticket = await dataClient.ticket.findAll(options);
    if (!ticket) throw new NotFoundException('There is no such ticket with this options');
    return ticket;
  }

  @Transaction()
  public async updateTicket(ticketId: number, ticketDto: UpdateTicketDto, @DataClient() dataClient?: IDataClient): Promise<Ticket> {
    const ticket = await dataClient.ticket.updateById(ticketId, ticketDto);
    if (!ticket) throw new NotFoundException('There is no such ticket with this ID');
    return ticket;
  }

  @Transaction()
  public async updateTickets(options: QueryOptions, ticketDto: UpdateTicketDto, @DataClient() dataClient?: IDataClient): Promise<Ticket[]> {
    const ticket = await dataClient.ticket.updateAll(options, ticketDto);
    if (!ticket) throw new NotFoundException('There is no such ticket with this options');
    return ticket;
  }
}
