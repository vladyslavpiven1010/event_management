import { Module } from '@nestjs/common';
import { CategoryService, EventService, TicketService } from './services';
import { TokenService } from './services/token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Event, Ticket, User } from './entities';

@Module({
  providers: [
    // Register all business logic services
    CategoryService, EventService, TicketService, TokenService
  ],
  exports: [
    // Export all business logic services
    CategoryService, EventService, TicketService
  ],
  imports: [
    TypeOrmModule.forFeature([Category, Event, Ticket, User]),
    JwtModule.register({
    secret: 'sdfsdf',
    signOptions: { expiresIn: '1m' },
  })
]
})
export class CoreModule {}
