import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Patch, Param, Delete } from '@nestjs/common';
//import { CheckAuth, User } from 'src/guards';
import { TicketService } from 'src/core/services';
import { CreateTicketReqApiDto } from './dto/create-ticket.dto';
import { UpdateTicketReqApiDto } from './dto/update-ticket.dto';

@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Get()
    //@CheckAuth()
    async getTickets(): Promise<any> {
        const ticket = await this.ticketService.findAll();
        return ticket;
    }

    @Get(':id')
    //@CheckAuth()
    async getTicket(@Param() params): Promise<any> {
        const ticket = await this.ticketService.findOne(params.id);
        return ticket;
    }

    @Post()
    //@CheckAuth()
    async createTicket(@Body() ticketDto: CreateTicketReqApiDto): Promise<any> {
        const ticket = await this.ticketService.create(ticketDto);
        return ticket;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateTicket(@Param() params: number, @Body() ticketDto: UpdateTicketReqApiDto): Promise<any> {
        const ticket = await this.ticketService.update(params["id"], ticketDto);
        return ticket;
    }

    @Delete(':id')
    //@CheckAuth()
    async deleteTicket(@Param() params: number): Promise<any> {
        const ticket = await this.ticketService.remove(params["id"]);
        return ticket;
    }
}
