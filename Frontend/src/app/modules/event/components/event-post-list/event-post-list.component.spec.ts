import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPostListComponent } from './event-post-list.component';

describe('EventPostListComponent', () => {
  let component: EventPostListComponent;
  let fixture: ComponentFixture<EventPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPostListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
