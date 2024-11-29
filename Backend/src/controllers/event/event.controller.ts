import { Body, Controller, Post, Get, Patch, Param, Query, Delete, ParseArrayPipe, UseGuards } from '@nestjs/common';
import { EventService } from 'src/core/services';
import { CreateEventReqApiDto } from './dto/create-event.dto';
import { UpdateEventReqApiDto } from './dto/update-event.dto';
import { Event } from 'src/core/entities';
import { JwtAuthGuard, ERole } from 'src/core/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RequiredRoles } from '../auth/roles.decorator';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService) {}

    @Get()
    async getEvents(
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
    async getEvent(@Param() params): Promise<any> {
        const event = await this.eventService.findOne(params.id);
        return event;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
    @Post()
    async createEvent(@Body() eventDto: CreateEventReqApiDto): Promise<any> {
        const event = await this.eventService.create(eventDto);
        return event;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
    @Patch(':id')
    async updateEvent(@Param() params: number, @Body() eventDto: UpdateEventReqApiDto): Promise<any> {
        const event = await this.eventService.update(params["id"], eventDto);
        return event;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
    @Delete(':id')
    async deleteEvent(@Param() params: number): Promise<any> {
        const event = await this.eventService.remove(params["id"]);
        return event;
    }
}
