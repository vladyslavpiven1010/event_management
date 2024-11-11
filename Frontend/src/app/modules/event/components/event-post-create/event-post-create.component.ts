import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ICreatePost } from '@app/modules/shared/create-entities';
import { EventService } from '../../event.service';

@Component({
  selector: 'tp-event-post-create',
  templateUrl: './event-post-create.component.html',
  styleUrls: ['./event-post-create.component.scss']
})
export class EventPostCreateComponent implements OnInit {
  @Input() eventId!: number
  profileForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  onSubmit() {
    let newPost: ICreatePost = {
      event_id: this.eventId,
      title: this.profileForm.value.title ? this.profileForm.value.title : "",
      content: this.profileForm.value.content ? this.profileForm.value.content : ""
    }

    console.log(newPost)

    this.eventService.createPost(newPost)
  }


  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

}
