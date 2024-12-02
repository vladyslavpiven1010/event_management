import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { 
  CategoryController,
  EventController,
  TicketController,
  UserController,
  CompanyController,
  AuthController
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Company, Event, Role, Ticket, User, VerificationCode } from './core/entities';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './core/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Event_Management_System',
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
    CompanyController,
    AuthController
  ],
  providers: [],
  exports: []
})
export class AppModule {}
