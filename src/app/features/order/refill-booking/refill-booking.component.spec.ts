import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillBookingComponent } from './refill-booking.component';

describe('RefillBookingComponent', () => {
  let component: RefillBookingComponent;
  let fixture: ComponentFixture<RefillBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefillBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
