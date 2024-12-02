import { Component, ElementRef, HostBinding, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IModal } from '@shared/modal';
import { ModalService } from './modal.service';

@Component({
  selector: 'tp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @HostBinding('class.modal_hidden') protected isHidden: boolean = true;
  @HostBinding('class.modal_shown') protected isShown: boolean = false;
  @ViewChild('container') protected container!: ElementRef;
  protected modal?: IModal;

  constructor(
    protected parentInjector: Injector,
    protected modalService: ModalService,
    @Inject(DOCUMENT) protected document: Document,
  ) {}

  ngOnInit(): void {
    this.modalService.$state.subscribe(
      (modal: IModal) => {
        if (modal.isShown) {
          this.show(modal);
        } else {
          this.hide();
        }
      },
      err => console.error(err),
    );
  }

  private show(modal: IModal) {
    this.modal = modal;
    this.isHidden = false;
    this.document.getElementById('app_body')?.classList.add('no_scroll');

    setTimeout(() => {
      this.isShown = true;
    }, 1);
  }

  private hide() {
    this.isShown = false;
    this.document.getElementById('app_body')?.classList.remove('no_scroll');

    setTimeout(() => {
      this.modal = undefined;
      this.isHidden = true;
    }, 300);
  }
}
