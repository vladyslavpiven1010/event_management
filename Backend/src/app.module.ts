import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { 
  CategoryController,
  EventController,
  TicketController,
  UserController,
  CompanyController
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Company, Event, Role, Ticket, User, VerificationCode } from './core/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'event_management',
      entities: [User, Company, Event, Ticket, Role, VerificationCode, Category],
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
    CompanyController
  ],
  providers: [],
})
export class AppModule {}
