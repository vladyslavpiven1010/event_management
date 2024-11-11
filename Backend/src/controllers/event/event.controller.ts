import { Body, Controller, Post, Get, Patch, Param, Query, Delete, ParseArrayPipe } from '@nestjs/common';
//import { CheckAuth, User } from 'src/guards';
import { EventService } from 'src/core/services';
import { CreateEventReqApiDto } from './dto/create-event.dto';
import { UpdateEventReqApiDto } from './dto/update-event.dto';
import { Event } from 'src/core/entities';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService) {}

    @Get()
    //@CheckAuth()
    async getCategories(
        @Query('sortBy') sortBy?: keyof Event,
        @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
        @Query('filterByCategory') filterByCategory?: string,
        @Query('filterByTicketPrice') filterByTicketPrice?: string
    ): Promise<any> {
        const event = await this.eventService.findAll(
            sortBy || 'event_date',
            sortOrder,
            filterByCategory ? filterByCategory.split(',').map(Number) : [],
            filterByTicketPrice ? filterByTicketPrice.split(',').map(Number) : []
        );
        return event;
    }

    @Get(':id')
    //@CheckAuth()
    async getHandler(@Param() params): Promise<any> {
        const event = await this.eventService.findOne(params.id);
        return event;
    }

    @Post()
    //@CheckAuth()
    async createHandler(@Body() eventDto: CreateEventReqApiDto): Promise<any> {
        const event = await this.eventService.create(eventDto);
        return event;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateHandler(@Param() params: number, @Body() eventDto: UpdateEventReqApiDto): Promise<any> {
        const event = await this.eventService.update(params["id"], eventDto);
        return event;
    }

    @Delete(':id')
    //@CheckAuth()
    async deleteEvent(@Param() params: number): Promise<any> {
        const event = await this.eventService.remove(params["id"]);
        return event;
    }
}
