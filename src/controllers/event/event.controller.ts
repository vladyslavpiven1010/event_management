import { Body, Controller, Post, Get, Patch, Param, HostParam, Query } from '@nestjs/common';
//import { CheckAuth, User } from 'src/guards';
import { EventService } from 'src/core/services';
import { CreateEventReqApiDto } from './dto/create-event.dto';
import { UpdateEventReqApiDto } from './dto/update-event.dto';
import { QueryOptions } from 'src/core/abstracts';

@Controller('event')
export class EventController {
    constructor(private _eventService: EventService) {}

    @Get()
    //@CheckAuth()
    async getCategories(@Query() query: any): Promise<any> {
        let options: QueryOptions = {
            where: undefined,
            orderBy: { 
                [query.sort]: 'ASC'
            },
            offset: undefined,
            limit: undefined
        }

        if (query.category_id !== 0 && query.category_id !== "0" && query.category_id !== '0') {
            options.where = {
                category_id: query.category_id
            } 
        }
        if (query.format !== 0 && query.format !== "0" && query.format !== '0') {
            options.where = {
                format: query.format
            }
        }  

        const event = await this._eventService.getEvents(options);
        return event;
    }

    @Get(':id')
    //@CheckAuth()
    async getHandler(@Param() params): Promise<any> {
        const event = await this._eventService.getEvent(params.id);
        return event;
    }

    @Post()
    //@CheckAuth()
    async createHandler(@Body() eventDto: CreateEventReqApiDto): Promise<any> {
        const event = await this._eventService.createEvent(eventDto);
        return event;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateHandler(@Param() params: number, @Body() eventDto: UpdateEventReqApiDto): Promise<any> {
        const event = await this._eventService.updateEvent(params["id"], eventDto);
        return event;
    }
}
