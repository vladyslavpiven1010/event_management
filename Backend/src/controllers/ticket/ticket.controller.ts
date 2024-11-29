import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TicketService } from 'src/core/services';
import { CreateTicketReqApiDto } from './dto/create-ticket.dto';
import { UpdateTicketReqApiDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/core/jwt-auth.guard';

@Controller('ticket')
@UseGuards(JwtAuthGuard)
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Get()
    async getTickets(): Promise<any> {
        const ticket = await this.ticketService.findAll();
        return ticket;
    }

    @Get(':id')
    async getTicket(@Param() params): Promise<any> {
        const ticket = await this.ticketService.findOne(params.id);
        return ticket;
    }

    @Post()
    async createTicket(@Body() ticketDto: CreateTicketReqApiDto): Promise<any> {
        const ticket = await this.ticketService.create(ticketDto);
        return ticket;
    }

    @Patch(':id')
    async updateTicket(@Param() params: number, @Body() ticketDto: UpdateTicketReqApiDto): Promise<any> {
        const ticket = await this.ticketService.update(params["id"], ticketDto);
        return ticket;
    }

    @Delete(':id')
    async deleteTicket(@Param() params: number): Promise<any> {
        const ticket = await this.ticketService.remove(params["id"]);
        return ticket;
    }
}
