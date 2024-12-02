import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IRegisterUser } from '../../entities';
import { AuthService } from '../../auth.service';
import { ISection, ModalService } from '@app/modules/shared/modal';
import { VerifyComponent } from '../verify/verify.component';

@Component({
  selector: 'tp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  profileForm = new FormGroup({
    phone: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  });
//+380958933572
  onSubmit() {
    let newUser: IRegisterUser = {
      phone: this.profileForm.value.phone ? this.profileForm.value.phone : "",
      password: this.profileForm.value.password ? this.profileForm.value.password : "",
      password_confirmation: this.profileForm.value.passwordConfirmation ? this.profileForm.value.passwordConfirmation : "",
    }

    console.log(newUser)

    let section: ISection = {
      component: VerifyComponent
    }

    this.authService.register(newUser)
    this.modalService.show(section)

  }
  constructor(private authService: AuthService, private modalService: ModalService) { }

  ngOnInit(): void {
  }

}
