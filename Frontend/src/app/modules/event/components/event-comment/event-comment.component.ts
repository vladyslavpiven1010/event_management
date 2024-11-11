import { Component, Input, OnInit } from '@angular/core';
import { IComment, IEvent } from '@app/modules/shared/entities';
import { EventService } from '../../event.service';

@Component({
  selector: 'tp-event-comment',
  templateUrl: './event-comment.component.html',
  styleUrls: ['./event-comment.component.scss']
})

export class EventCommentComponent implements OnInit {
  @Input() comment!: IComment
  event!: IEvent

  constructor(protected eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvent(this.comment.event_id).subscribe((event) => this.event = event)
  }

}
