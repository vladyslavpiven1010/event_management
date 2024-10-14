import { Body, Controller, Post, Get, Patch, Param, HostParam, Query } from '@nestjs/common';
//import { CheckAuth, User } from 'src/guards';
import { EventService } from 'src/core/services';
import { CreateEventReqApiDto } from './dto/create-event.dto';
import { UpdateEventReqApiDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
    constructor(private _eventService: EventService) {}

    @Get()
    //@CheckAuth()
    async getCategories(@Query() query: any): Promise<any> {
        const event = await this._eventService.findAll();
        return event;
    }

    @Get(':id')
    //@CheckAuth()
    async getHandler(@Param() params): Promise<any> {
        const event = await this._eventService.findOne(params.id);
        return event;
    }

    @Post()
    //@CheckAuth()
    async createHandler(@Body() eventDto: CreateEventReqApiDto): Promise<any> {
        const event = await this._eventService.create(eventDto);
        return event;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateHandler(@Param() params: number, @Body() eventDto: UpdateEventReqApiDto): Promise<any> {
        const event = await this._eventService.update(params["id"], eventDto);
        return event;
    }
}
