import { Component, OnInit } from '@angular/core';
import { BasePage, ISection } from '@app/modules/shared/page';
import { TicketListComponent } from '../../components';

@Component({
  selector: 'tp-ticket-page',
  template: BasePage.template,
})
export class TicketPage extends BasePage implements OnInit {

  protected override mainSections?: ISection[] = [
    {
      component: TicketListComponent
    }
  ]
  // protected override asideSections?: ISection[] = [
  //   {
  //     component: TicketInfoComponent,
  //     title: "About tickets"
  //   }
  // ]

  constructor() { super() }
  
  ngOnInit(): void {
    
  }
}
