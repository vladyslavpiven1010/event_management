import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '@app/modules/shared/entities';
import { EventService } from '../../event.service';

@Component({
  selector: 'tp-event-post',
  templateUrl: './event-post.component.html',
  styleUrls: ['./event-post.component.scss']
})

export class EventPostComponent implements OnInit {
  @Input() post!: IPost

  constructor(protected eventService: EventService) { }

  ngOnInit(): void {
    //this.eventService.getEvent(this.post.event_id).subscribe((event) => this.post = event)
  }

}
