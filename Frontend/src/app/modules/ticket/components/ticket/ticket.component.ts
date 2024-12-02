import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '@app/modules/event/event.service';
import { IEvent, ITicket } from '@app/modules/shared/entities';

@Component({
  selector: 'tp-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() ticket!: ITicket
  event!: IEvent

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvent(this.ticket.event_id).subscribe((event) => this.event = event)
  }

}
