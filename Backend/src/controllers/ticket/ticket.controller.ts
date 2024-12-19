import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards, Req, ForbiddenException, BadRequestException } from '@nestjs/common';
import { EventService, TicketService } from 'src/core/services';
import { CreateTicketReqApiDto } from './dto/create-ticket.dto';
import { UpdateTicketReqApiDto } from './dto/update-ticket.dto';
import { ERole, JwtAuthGuard } from 'src/core/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('ticket')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketController {
    constructor(
        private ticketService: TicketService, 
        private eventService: EventService
    ) {}

    @Get()
    async getTickets(): Promise<any> {
        const ticket = await this.ticketService.findAll();
        return ticket;
    }

    @Get('all_own')
    async getAllTicketsOfUser(@Req() request: any): Promise<any> {
        const ticket = await this.ticketService.findAllByUser(request.user.sub);
        return ticket;
    }

    @Get(':id')
    async getTicket(@Req() request: any, @Param() params): Promise<any> {
        const ticket = await this.ticketService.findOne(params.id);

        if (!ticket) throw new BadRequestException("Ticket with this credentials does not exist");
        if (request.user.role !== ERole.ADMIN && ticket.user_id.id !== request.user.sub) 
            throw new ForbiddenException('You do not have permission to update this ticket');
        
        return ticket;
    }

    @Post()
    async createTicket(@Req() request: any, @Body() ticketDto: CreateTicketReqApiDto): Promise<any> {
        const event = await this.eventService.findOne(ticketDto.event_id);
        const ticketCount = await this.ticketService.getTicketCount(ticketDto.event_id);

        if (!event) throw new BadRequestException("Event with this credentials does not exist");
        if (ticketCount >= event.ticket_count) throw new BadRequestException('All tickets was sold');

        const ticket = await this.ticketService.create(request.user.sub, ticketDto);

        return ticket;
    }

    // @Patch(':id')
    // async updateTicket(@Req() request: any, @Param() params: number, @Body() ticketDto: UpdateTicketReqApiDto): Promise<any> {
    //     const ticket = await this.ticketService.findOne(params["id"]);
    //     const event = await this.eventService.findOne(ticketDto.event_id);

    //     if (!ticket) throw new BadRequestException("Ticket with this credentials does not exist");
    //     if (!event) throw new BadRequestException("Event with this id does not exist");
    //     if (request.user.role !== ERole.ADMIN)
    //         throw new ForbiddenException('You do not have permission to update this ticket');

    //     const updatedTicket = await this.ticketService.update(params["id"], ticketDto);
    //     return updatedTicket;
    // }

    @Delete(':id')
    async deleteTicket(@Req() request: any, @Param() params: number): Promise<any> {
        const ticket = await this.ticketService.findOne(params["id"]);

        if (!ticket) throw new BadRequestException("Ticket with this credentials does not exist");
        if (request.user.role !== ERole.ADMIN && ticket.user_id.id !== request.user.sub) 
            throw new ForbiddenException('You do not have permission to delete this ticket');

        const deletedTicket = await this.ticketService.remove(params["id"]);
        return deletedTicket;
    }
}
