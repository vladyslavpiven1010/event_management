import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/user.service';
import { CompanyService } from '../../company.service';
import { ISection, ModalService } from '@app/modules/shared/modal';
import { LoginComponent } from '@app/modules/auth/components/login/login.component';
import { RegisterComponent } from '@app/modules/auth/components/register/register.component';
import { ICompany } from '@app/modules/shared/entities';

@Component({
  selector: 'tp-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.scss']
})

export class UserPickerComponent implements OnInit {
  user: string = ""
  companyName!: string

  constructor(private userService: UserService, private companyService: CompanyService, private modalService: ModalService) { }

  callLoginModal() {
    console.log("Call Modal")
    let modalSection: ISection = {
      component: LoginComponent
    }
    this.modalService.show(modalSection)

  }

  callRegisterModal() {
    console.log("Call Modal")
    let modalSection: ISection = {
      component: RegisterComponent
    }
    this.modalService.show(modalSection)

  }

  ngOnInit(): void {
    this.userService.User().subscribe((user) => this.user = user)
    this.companyService.Company().subscribe((company) => this.companyName = company.name)
  }
}
