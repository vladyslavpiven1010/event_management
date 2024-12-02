import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ESorting } from '@app/modules/shared/enums';
import { FindOptionsService } from '../../filters.service';

@Component({
  selector: 'tp-event-sorting',
  templateUrl: './event-sorting.component.html',
  styleUrls: ['./event-sorting.component.scss']
})

export class EventSortingComponent implements OnInit {
  sortMethod: ESorting = ESorting.created_at;
  sortMethodDisplay: string = "Sort by date";

  constructor(private findOptionsService: FindOptionsService) { }

  ShowSort() {
    let x = document.getElementById("sort");
    if (x?.className === "sort__list") {
        x.className += " responsive";
    }
    else if (x?.className) {
        x.className = "sort__list";
    }
  }

  ChooseSortMethod(method: string) {
    let x = document.getElementById("sort");

    if (x?.className) {
      x.className = "sort__list";
    }

    switch (method) {
      case "date": {
        this.sortMethodDisplay = "Sort by date";
        break;
      }
      
      case "name": {
        this.sortMethodDisplay = "Sort by name";
        break;
      }

      case "ticket_price": {
        this.sortMethodDisplay = "Sort by price";
        break;
      }

      case "ticket_count": {
        this.sortMethodDisplay = "Sort by free places";
        break;
      }
    }

    this.sortMethod = Object.values(ESorting)[Object.values(ESorting).indexOf(method as unknown as ESorting)]
    this.findOptionsService.setSortMethod(this.sortMethod)
  }

  ngOnInit(): void {
   this.findOptionsService.setSortMethod(ESorting.created_at)
  }

}
