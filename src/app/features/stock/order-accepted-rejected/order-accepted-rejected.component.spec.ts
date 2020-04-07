import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAcceptedRejectedComponent } from './order-accepted-rejected.component';

describe('OrderAcceptedRejectedComponent', () => {
  let component: OrderAcceptedRejectedComponent;
  let fixture: ComponentFixture<OrderAcceptedRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAcceptedRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAcceptedRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
