import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSortingComponent } from './event-sorting.component';

describe('EventSortingComponent', () => {
  let component: EventSortingComponent;
  let fixture: ComponentFixture<EventSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSortingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
