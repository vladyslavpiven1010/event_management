import { Component, OnInit } from '@angular/core';
import { IEvent, ITicket } from '@app/modules/shared/entities';
import { TicketService } from '../../ticket.service';
import { EventService } from '@app/modules/event/event.service';

@Component({
  selector: 'tp-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})

export class TicketInfoComponent implements OnInit {
  public ticketList!: ITicket[]
  eventList!: IEvent[]

  constructor(private ticketService: TicketService, private eventService: EventService) { }

  getActivity(): number {
    return this.eventList.filter((event) => {
      event.date < new Date()
    }).length
  }

  getUserId() {
    return 1;
  }

  ngOnInit(): void {
    this.ticketService.getTickets(this.getUserId()).subscribe((tickets) => this.ticketList = tickets)
    this.ticketList.forEach(ticket => {
      this.eventService.getEvent(ticket.event_id).subscribe((event) => this.eventList.push(event))
    });
  }
}
