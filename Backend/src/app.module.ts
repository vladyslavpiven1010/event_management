import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { 
  CategoryController,
  EventController,
  TicketController,
  UserController,
  CompanyController,
  AuthController,
  NotificationController
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Company, Event, Notification, NotificationTopic, Role, Ticket, User, UserNotification, VerificationCode } from './core/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Event_Management_System',
      entities: [User, Company, Event, Ticket, Role, VerificationCode, Category, Notification, UserNotification, NotificationTopic],
      synchronize: true,
      autoLoadEntities: true
    }),
    CoreModule, 
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [
    CategoryController, 
    EventController, 
    TicketController,
    UserController,
    CompanyController,
    AuthController,
    NotificationController
  ],
  providers: [],
  exports: []
})
export class AppModule {}
