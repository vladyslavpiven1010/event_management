import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { IEvent } from '@app/modules/shared/entities';
import { EventService } from '../../event.service';
import { CompanyService } from '@app/modules/core/company.service';

@Component({
  selector: 'tp-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

export class EventComponent implements OnInit {
  @Input() event!: IEvent
  public categoryName!: string;
  public format!: string
  isOwner: boolean = false

  getData() {
    return this.event.date.toString().split('T')[0]
  }

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

  constructor(protected eventService: EventService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.eventService.getCategory(this.event.category_id).subscribe((category) => {
      this.categoryName = category.name
      
    })
    this.companyService.Company().subscribe((company) => {
      this.isOwner = this.event.company_id == company.id
    })
  }
}
