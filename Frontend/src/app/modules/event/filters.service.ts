import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ESorting } from '../shared/enums';
import { Options } from '@angular-slider/ngx-slider';
import { FindOptions } from '../shared/entities';

@Injectable()

export class FindOptionsService {
  private options = new BehaviorSubject<FindOptions>({
    filters: {
      filterCategory: 0,
      filterFormat: 0
    },
    sort: ESorting.created_at
  });

  setFilters(filters: number[]) {
    this.options.next({
      filters: {
        filterCategory: filters[0],
        filterFormat: filters[1]
      },
      sort: this.options.value.sort
    })
  }

  getOptions(): Observable<FindOptions> {
    return this.options;
  }

  setSortMethod(sort: ESorting) {
    this.options.next({
      filters: /*this.options.value.filters,*/ {
        filterCategory: 0,
        filterFormat: 0
      },
      sort: sort
    })
  }

  constructor() { }
}
