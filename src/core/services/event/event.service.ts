import { Event } from 'src/core/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from './dtos';

/**
 * Class that represents Event service. It contains business logic.
 */
@Injectable()
export class EventService implements ITransactable {
  constructor(public _dataProvider: IDataProvider) {}

  @Transaction()
  public async createEvent(eventDto: CreateEventDto, @DataClient() dataClient?: IDataClient): Promise<Event> {
    const eventDraft: Event = {
      ...eventDto,
      created_at: new Date(),
      deleted_at: null,
      //date: new Date(eventDto.date)
    };
    const Event = await dataClient.event.create(eventDraft);
    return Event;
  }

  @Transaction()
  public async getEvent(eventId: number, @DataClient() dataClient?: IDataClient): Promise<Event> {
    const event = await dataClient.event.findById(eventId);
    if (!event) throw new NotFoundException('There is no such Event with this ID');
    return event;
  }

  @Transaction()
  public async getEventByOption(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Event> {
    const event = await dataClient.event.findOne(options)
    if (!event) throw new NotFoundException('There is no such Event with this option');
    return event;
  }

  @Transaction()
  public async getEvents(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Event[]> {
    const event = await dataClient.event.findAll(options);
    if (!event) throw new NotFoundException('There is no such Event with this options');
    return event;
  }

  @Transaction()
  public async updateEvent(EventId: number, eventDto: UpdateEventDto, @DataClient() dataClient?: IDataClient): Promise<Event> {
    const event = await dataClient.event.updateById(EventId, eventDto);
    if (!event) throw new NotFoundException('There is no such Event with this ID');
    return event;
  }

  @Transaction()
  public async updateEvents(options: QueryOptions, eventDto: UpdateEventDto, @DataClient() dataClient?: IDataClient): Promise<Event[]> {
    const event = await dataClient.event.updateAll(options, eventDto);
    if (!event) throw new NotFoundException('There is no such Event with this options');
    return event;
  }
}
