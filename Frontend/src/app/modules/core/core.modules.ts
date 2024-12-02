import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DynamicAttributesModule, DynamicIoModule, DynamicModule } from 'ng-dynamic-component';
import { HomePage } from './pages';
import { SidebarComponent } from './components';
import { MenuComponent } from './components/menu/menu.component';
import { UserPickerComponent } from './components/user-picker/user-picker.component';
import { RouterModule } from '@angular/router';
import { GreetingsComponent } from './components/greetings/greetings.component';
import { CompanyService } from './company.service';
import { UserService } from '../auth/user.service';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    HomePage, 
    SidebarComponent,
    MenuComponent, 
    UserPickerComponent, 
    GreetingsComponent
    ],
    providers: [
      CompanyService,
      UserService
    ],
  imports: [
    CommonModule, 
    RouterModule,
    SharedModule, 
    DynamicModule, 
    DynamicIoModule, 
    DynamicAttributesModule,
    AuthModule
  ],
  exports: [SidebarComponent, HomePage]
})
export class CoreModule {}
