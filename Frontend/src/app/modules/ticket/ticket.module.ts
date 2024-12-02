import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DynamicAttributesModule, DynamicIoModule, DynamicModule } from 'ng-dynamic-component';
import { RouterModule } from '@angular/router';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
// import { TicketInfoComponent } from './components/ticket-info/ticket-info.component';
import { TicketPage } from './pages/ticket-page/ticket-page';
import { TicketService } from './ticket.service';

@NgModule({
  declarations: [
    TicketComponent,
    TicketListComponent,
    // TicketInfoComponent,
    TicketPage
  ],
  providers: [
    TicketService
  ],
  imports: [
    CommonModule,
    RouterModule, 
    SharedModule, 
    DynamicModule, 
    DynamicIoModule, 
    DynamicAttributesModule
  ],
  exports: [
    TicketComponent,
    TicketListComponent,
    // TicketInfoComponent,
    TicketPage
  ]
})
export class TicketModule { }
