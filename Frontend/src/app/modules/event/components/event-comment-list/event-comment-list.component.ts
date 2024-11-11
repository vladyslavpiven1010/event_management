import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '@app/modules/shared/entities';
import { EventService } from '../../event.service';
import { ISection } from '@app/modules/shared/page';
import { EventCreateComponent } from '../event-create/event-create.component';
import { ModalService } from '@app/modules/shared/modal';
import { UserService } from '@app/modules/auth/user.service';
import { LoginComponent } from '@app/modules/auth/components/login/login.component';
import { ICreateComment } from '@app/modules/shared/create-entities';

@Component({
  selector: 'tp-event-comment-list',
  templateUrl: './event-comment-list.component.html',
  styleUrls: ['./event-comment-list.component.scss']
})

export class EventCommentListComponent implements OnInit {
  @Input() eventId!: number
  public commentList!: IComment[];
  user: string = ""
  text: string = ""

  addComment() {
    if (this.user != "") {
      if (this.text != "") {
        const comment: ICreateComment = {
          user_id: 1,
          event_id: this.eventId,
          content: this.text
        }

        console.log(comment)
        this.eventService.createComment(comment)
        this.eventService.getComments(this.eventId).subscribe((comment) => this.commentList = comment)
      }
    }
    else {
      let modalSection: ISection = {
        component: LoginComponent
      }

      this.modalService.show(modalSection)
    }
  }

  constructor(protected eventService: EventService, private modalService: ModalService, private userService: UserService) { }

  ngOnInit(): void {
    this.eventService.getComments(this.eventId).subscribe((comment) => this.commentList = comment)
    this.userService.User().subscribe((user) => this.user = user)
  }

}
