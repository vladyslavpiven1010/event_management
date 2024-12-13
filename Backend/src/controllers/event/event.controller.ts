import { Body, Controller, Post, Get, Patch, Param, Query, Delete, ParseArrayPipe, UseGuards, Req, ForbiddenException, BadRequestException } from '@nestjs/common';
import { EventService, UserService } from 'src/core/services';
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
        console.log(sortBy, sortOrder, filterByCategory, filterByTicketPrice)
        const event = await this.eventService.findAll(
            sortBy || 'event_date',
            sortOrder,
            filterByCategory ? filterByCategory.split(',').map(Number) : [],
            filterByTicketPrice ? filterByTicketPrice.split(',').map(Number) : []
        );
        return event;
    }

    @UseGuards(JwtAuthGuard)
    @Get('all_own')
    async getAllEventsOfUser(@Req() request: any): Promise<any> {
        const event = await this.eventService.findAllByUser(request.user.sub);
        return event;
    }

    @Get(':id')
    async getEvent(@Param() params): Promise<any> {
        const event = await this.eventService.findOne(params.id);
        if (!event) throw new BadRequestException("Event with this credentials does not exist");

        return event;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
    @Post()
    async createEvent(@Req() request: any, @Body() eventDto: CreateEventReqApiDto): Promise<any> {
        const event = await this.eventService.create(request.user.sub, eventDto);
        return event;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
    @Patch(':id')
    async updateEvent(@Req() request: any, @Param() params: number, @Body() eventDto: UpdateEventReqApiDto): Promise<any> {
        const event = await this.eventService.findOne(params["id"]);

        console.log(event)

        if (!event) throw new BadRequestException("Event with this credentials does not exist");
        if (request.user.role !== ERole.ADMIN && event.user_id.id !== request.user.sub) 
          throw new ForbiddenException('You do not have permission to update this event');

        const updatedEvent = await this.eventService.update(params["id"], eventDto);
        return updatedEvent;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RequiredRoles(ERole.COMPANY_USER, ERole.ADMIN)
    @Delete(':id')
    async deleteEvent(@Req() request: any, @Param() params: number): Promise<any> {
      const event = await this.eventService.findOne(params["id"]);

      if (!event) throw new BadRequestException("Event with this credentials does not exist");
      if (request.user.role !== ERole.ADMIN && event.user_id.id !== request.user.sub) 
        throw new ForbiddenException('You do not have permission to delete this event');

      const deletedEvent = await this.eventService.remove(params["id"]);
      return deletedEvent;
    }
}
