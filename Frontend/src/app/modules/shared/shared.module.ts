import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicAttributesModule, DynamicIoModule, DynamicModule } from 'ng-dynamic-component';
import { BasePage } from './page';
import { ModalComponent, ModalService } from './modal';


@NgModule({
  declarations: [BasePage, ModalComponent],
  providers: [ModalService],
  imports: [CommonModule, DynamicModule, DynamicIoModule, DynamicAttributesModule],
  exports: [BasePage, ModalComponent],
})
export class SharedModule {}
