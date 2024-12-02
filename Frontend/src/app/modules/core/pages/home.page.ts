import { Component, OnInit } from '@angular/core';
import { BasePage, ISection } from '@app/modules/shared/page';
import { EventFiltersComponent, EventsListComponent } from '@app/modules/event/components';
import { EventSortingComponent } from '@app/modules/event/components/event-sorting/event-sorting.component';
import { ESorting } from '@app/modules/shared/enums';
import { IFilters } from '@app/modules/shared/entities';

// 298 123 308
@Component({
  selector: 'tp-home-page',
  template: BasePage.template,
})

export class HomePage extends BasePage implements OnInit {
  public filters!: IFilters
  public sorting!: ESorting

  protected override mainSections?: ISection[] = [
    {
      component: EventsListComponent
    }
  ]
  protected override asideSections?: ISection[] = [
    {
      component: EventFiltersComponent
    },
    {
      component: EventSortingComponent
    }
  ]

  ngOnInit(): void {
    //this.filterService.getFilters().subscribe(this.getFilters)
  }
}
