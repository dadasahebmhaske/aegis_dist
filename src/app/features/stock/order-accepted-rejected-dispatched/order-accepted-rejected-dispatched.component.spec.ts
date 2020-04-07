import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAcceptedRejectedDispatchedComponent } from './order-accepted-rejected-dispatched.component';

describe('OrderAcceptedRejectedDispatchedComponent', () => {
  let component: OrderAcceptedRejectedDispatchedComponent;
  let fixture: ComponentFixture<OrderAcceptedRejectedDispatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAcceptedRejectedDispatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAcceptedRejectedDispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
