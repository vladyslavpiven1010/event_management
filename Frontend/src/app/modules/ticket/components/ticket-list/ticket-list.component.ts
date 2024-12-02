import { Component, OnInit } from '@angular/core';
import { ITicket } from '@app/modules/shared/entities';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'tp-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  public ticketList!: ITicket[]

  constructor(private ticketService: TicketService) { }

  getUserId() {
    return 1;
  }

  ngOnInit(): void {
    this.ticketService.getTickets(this.getUserId()).subscribe((tickets) => this.ticketList = tickets)
  }

}
