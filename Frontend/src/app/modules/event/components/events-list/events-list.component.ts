import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, interval, merge } from 'rxjs';
import { FindOptions, ICategory, IEvent, IFilters } from '@app/modules/shared/entities';
import { EventService } from '../../event.service';
import { ESorting } from '@app/modules/shared/enums';
import { FindOptionsService } from '../../filters.service';

@Component({
  selector: 'tp-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})

export class EventsListComponent implements OnInit {
  isSimilarFilter: boolean = false
  isSimilarCategory: boolean = false

  public eventList!: IEvent[];
  public isBig = false;

  constructor(private eventService: EventService, private findOptionsService: FindOptionsService) {  }

  getE(findOptions: FindOptions) {
    this.eventService.getEvents(findOptions.filters, findOptions.sort).subscribe((products) => this.eventList = products)
  }

  ngOnInit(): void {
    console.log(this.eventService, this.findOptionsService)
    this.getE({ filters: {filterCategory: 0, filterFormat: 0}, sort: ESorting.created_at})
    this.findOptionsService.getOptions().subscribe(options => {
      this.getE(options)
      console.log(options.sort)
    })
  }
}
