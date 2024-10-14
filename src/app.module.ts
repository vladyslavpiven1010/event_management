import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { 
  CategoryController,
  EventController,
  TicketController
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'event_management',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    CoreModule, 
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [
    CategoryController, 
    EventController, 
    TicketController
  ],
  providers: [],
})
export class AppModule {}
