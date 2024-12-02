import { Component, HostBinding } from '@angular/core';
import { ModalService } from '@shared/modal';

@Component({
  selector: 'tp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class.no_scroll') protected isNotScroll: boolean = false;
  title = 'tlprt-client'

  constructor(protected modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.$state.subscribe(modal => (this.isNotScroll = modal.isShown));
  }
}
