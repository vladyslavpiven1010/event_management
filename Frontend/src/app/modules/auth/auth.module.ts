import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyComponent } from './components/verify/verify.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent
  ],
  providers: [
    AuthService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
