import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '@app/modules/shared/entities';
import { EventService } from '../../event.service';
import { UserService } from '@app/modules/auth/user.service';
import { ISection } from '@app/modules/shared/page';
import { EventPostCreateComponent } from '../event-post-create/event-post-create.component';
import { ModalService } from '@app/modules/shared/modal';

@Component({
  selector: 'tp-event-post-list',
  templateUrl: './event-post-list.component.html',
  styleUrls: ['./event-post-list.component.scss']
})
export class EventPostListComponent implements OnInit {
  @Input() eventId!: number
  public postList!: IPost[];
  user: string = ""

  addPost() {
    let section: ISection = {
      component: EventPostCreateComponent,
      inputs: {
        eventId: this.eventId
      }
    }
    this.modalService.show(section)
  }

  constructor(protected eventService: EventService, private userService: UserService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.eventService.getPosts(this.eventId).subscribe((posts) => this.postList = posts)
    this.userService.User().subscribe((user) => this.user = user)
  }

}
