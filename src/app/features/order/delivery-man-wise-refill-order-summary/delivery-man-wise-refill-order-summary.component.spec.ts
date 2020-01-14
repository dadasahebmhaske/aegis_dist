import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryManWiseRefillOrderSummaryComponent } from './delivery-man-wise-refill-order-summary.component';

describe('DeliveryManWiseRefillOrderSummaryComponent', () => {
  let component: DeliveryManWiseRefillOrderSummaryComponent;
  let fixture: ComponentFixture<DeliveryManWiseRefillOrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryManWiseRefillOrderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryManWiseRefillOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
