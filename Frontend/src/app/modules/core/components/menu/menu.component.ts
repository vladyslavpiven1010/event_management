import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/user.service';
import { CompanyService } from '../../company.service';
import { ISection, ModalService } from '@app/modules/shared/modal';
import { EventCreateComponent } from '@app/modules/event/components/event-create/event-create.component';

@Component({
  selector: 'tp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user!: string
  companyName!: string

  constructor(private userService: UserService, private companyService: CompanyService, private modalService: ModalService) { }

  showCreateEventModal() {
    let section: ISection = {
      component: EventCreateComponent
    }
    this.modalService.show(section)
  }

  ngOnInit(): void {
    this.userService.User().subscribe((user) => this.user = user)
    this.companyService.Company().subscribe((company) => this.companyName = company.name)
  }

}
