import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IModal, ISection } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private state: BehaviorSubject<IModal> = new BehaviorSubject({
    isShown: false,
  } as IModal);

  public get $state(): BehaviorSubject<IModal> {
    return this.state;
  }

  public show(widget: ISection) {
    this.state.next({ isShown: true, ...widget });
  }

  public hide() {
    this.state.next({ isShown: false } as IModal);
  }
}
