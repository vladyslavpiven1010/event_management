import { Module } from '@nestjs/common';
import { AuthService, CategoryService, CompanyService, EventService, TicketService, UserService, TokenService, NotificationService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Company, Event, Notification, NotificationTopic, Ticket, Token, User, UserNotification } from './entities';

@Module({
  providers: [
    // Register all business logic services
    CategoryService, 
    EventService, 
    TicketService, 
    CompanyService, 
    UserService, 
    AuthService,
    NotificationService,
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
    NotificationService,
    JwtModule
  ],
  imports: [
    TypeOrmModule.forFeature([Category, Event, Ticket, User, Company, Token, Notification, UserNotification, NotificationTopic]),
    JwtModule.register({
      secret: 'sdfsdf',
      signOptions: { expiresIn: '15m' },
    })
  ]
})
export class CoreModule {}
