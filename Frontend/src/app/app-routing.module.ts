import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage} from '@core/pages';
import { EventPage } from './modules/event/pages/event-page.ts/event-page';
import { TicketPage } from './modules/ticket/pages/ticket-page/ticket-page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'events/:eventId', component: EventPage },
  { path: 'tickets', component: TicketPage },
  { path: '**', component: HomePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
