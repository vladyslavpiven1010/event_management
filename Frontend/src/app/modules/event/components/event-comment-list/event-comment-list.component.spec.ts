import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCommentListComponent } from './event-comment-list.component';

describe('EventCommentListComponent', () => {
  let component: EventCommentListComponent;
  let fixture: ComponentFixture<EventCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCommentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
