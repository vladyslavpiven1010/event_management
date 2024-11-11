import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { IEvent } from '@app/modules/shared/entities';

@Component({
  selector: 'tp-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})

export class EventInfoComponent implements OnInit {
  @Input() eventId!: number
  public categoryName!: string;
  public format!: string
  event!: IEvent

  getFormat() {
    if (this.event) {
      switch (this.event.format) {
        case 1: {
          return "Conference";
        }
        case 2: {
          return "Lecture";
        }
        case 3: {
          return "Workshop";
        }
        case 4: {
          return "Fest";
        }
      }
    }
    return ""
  }

  constructor(protected eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvent(this.eventId).subscribe((event) => this.event = event)
    this.eventService.getCategory(this.event.category_id).subscribe((category) => {
      this.categoryName = category.name
    })
  }
}
