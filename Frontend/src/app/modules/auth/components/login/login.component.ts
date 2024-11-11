import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ILoginUser, IRegisterUser } from '../../entities';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'tp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  profileForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    let user: ILoginUser = {
      login: this.profileForm.value.login ? this.profileForm.value.login : "",
      password: this.profileForm.value.password ? this.profileForm.value.password : "",
    }

    console.log(user)

    this.authService.login(user)
  }


  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    
  }

}
