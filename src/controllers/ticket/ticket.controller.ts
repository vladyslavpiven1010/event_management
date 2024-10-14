import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Patch, Param } from '@nestjs/common';
//import { CheckAuth, User } from 'src/guards';
import { TicketService } from 'src/core/services';
import { CreateTicketReqApiDto } from './dto/create-ticket.dto';
import { UpdateTicketReqApiDto } from './dto/update-ticket.dto';
import { QueryOptions } from 'src/core/abstracts';

@Controller('ticket')
export class TicketController {
    constructor(private _ticketService: TicketService) {}

    @Get()
    //@CheckAuth()
    async getTickets(@Body() options: QueryOptions): Promise<any> {

        const ticket = await this._ticketService.getTickets(options);
        return ticket;
    }

    @Get(':id')
    //@CheckAuth()
    async getTicket(@Param() params): Promise<any> {
        const ticket = await this._ticketService.getTicket(params.id);
        return ticket;
    }

    @Post()
    //@CheckAuth()
    async createTicket(@Body() ticketDto: CreateTicketReqApiDto): Promise<any> {
        const ticket = await this._ticketService.createTicket(ticketDto);
        return ticket;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateTicket(@Param() params: number, @Body() ticketDto: UpdateTicketReqApiDto): Promise<any> {
        const ticket = await this._ticketService.updateTicket(params["id"], ticketDto);
        return ticket;
    }
}
