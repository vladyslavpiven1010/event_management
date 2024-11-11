import { Component, OnInit } from '@angular/core';
import { BasePage } from '@app/modules/shared/page';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../event.service';
import { EventPostListComponent } from '../../components';
import { EventCommentListComponent } from '../../components';
import { EventInfoComponent } from '../../components/event-info/event-info.component';

@Component({
  selector: 'tp-event-page',
  template: BasePage.template,
})

export class EventPage extends BasePage implements OnInit {
  constructor(private route: ActivatedRoute, protected eventService: EventService) { super() }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const eventIdFromRoute = Number(routeParams.get('eventId'));
    this.mainSections = [
      {
        component: EventInfoComponent,
        inputs: {
          eventId: eventIdFromRoute
        }
      },
      {
        component: EventPostListComponent,
        inputs: {
          eventId: eventIdFromRoute
        }
      }
    ]
    this.asideSections = [
      {
        component: EventCommentListComponent,
        inputs: {
          eventId: eventIdFromRoute
        }
      }
    ]
  }
}
