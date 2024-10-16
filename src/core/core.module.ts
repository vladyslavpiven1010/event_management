import { Module } from '@nestjs/common';
import { CategoryService, CompanyService, EventService, TicketService, UserService } from './services';
import { TokenService } from './services/token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Company, Event, Ticket, User } from './entities';

@Module({
  providers: [
    // Register all business logic services
    CategoryService, EventService, TicketService, TokenService, CompanyService, UserService
  ],
  exports: [
    // Export all business logic services
    CategoryService, EventService, TicketService, TokenService, CompanyService, UserService
  ],
  imports: [
    TypeOrmModule.forFeature([Category, Event, Ticket, User, Company]),
    JwtModule.register({
    secret: 'sdfsdf',
    signOptions: { expiresIn: '1m' },
  })
]
})
export class CoreModule {}
