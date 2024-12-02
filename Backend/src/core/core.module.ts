import { Module } from '@nestjs/common';
import { AuthService, CategoryService, CompanyService, EventService, TicketService, UserService, TokenService } from './services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Company, Event, Ticket, Token, User } from './entities';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  providers: [
    // Register all business logic services
    CategoryService, 
    EventService, 
    TicketService, 
    CompanyService, 
    UserService, 
    AuthService, 
    TokenService
  ],
  exports: [
    // Export all business logic services
    CategoryService, 
    EventService, 
    TicketService, 
    CompanyService, 
    UserService, 
    AuthService, 
    TokenService,
    JwtModule
  ],
  imports: [
    TypeOrmModule.forFeature([Category, Event, Ticket, User, Company, Token]),
    JwtModule.register({
      secret: 'sdfsdf',
      signOptions: { expiresIn: '15m' },
    })
  ]
})
export class CoreModule {}
