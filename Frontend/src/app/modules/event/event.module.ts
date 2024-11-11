import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicAttributesModule, DynamicIoModule, DynamicModule } from 'ng-dynamic-component';
import { RouterModule } from '@angular/router';
import { EventComponent } from './components';
import { EventsListComponent } from './components';
import { EventPostComponent } from './components';
import { EventCommentComponent } from './components';
import { EventPage } from './pages/event-page.ts/event-page';
import { EventFiltersComponent } from './components';
import { EventSortingComponent } from './components';
import { EventCommentListComponent } from './components/event-comment-list/event-comment-list.component';
import { EventPostListComponent } from './components/event-post-list/event-post-list.component';
import { FindOptionsService } from './filters.service';
import { EventService } from './event.service';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventPostCreateComponent } from './components/event-post-create/event-post-create.component';

@NgModule({
  declarations: [
    EventComponent,
    EventsListComponent,
    EventPostComponent,
    EventCommentComponent,
    EventPage,
    EventFiltersComponent,
    EventSortingComponent,
    EventCommentListComponent,
    EventPostListComponent,
    EventInfoComponent,
    EventCreateComponent,
    EventPostCreateComponent
  ],
  providers: [
    FindOptionsService,
    EventService
  ],
  imports: [
    CommonModule,
    SharedModule, 
    DynamicModule, 
    DynamicIoModule, 
    DynamicAttributesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EventComponent,
    EventsListComponent,
    EventPostComponent,
    EventCommentComponent,
    EventPage,
    EventFiltersComponent,
    EventSortingComponent,
    EventCreateComponent
  ]
})
export class EventModule { }
