import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPostCreateComponent } from './event-post-create.component';

describe('EventPostCreateComponent', () => {
  let component: EventPostCreateComponent;
  let fixture: ComponentFixture<EventPostCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPostCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
