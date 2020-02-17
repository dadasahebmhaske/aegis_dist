import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillBookingListComponent } from './refill-booking-list.component';

describe('RefillBookingListComponent', () => {
  let component: RefillBookingListComponent;
  let fixture: ComponentFixture<RefillBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefillBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
