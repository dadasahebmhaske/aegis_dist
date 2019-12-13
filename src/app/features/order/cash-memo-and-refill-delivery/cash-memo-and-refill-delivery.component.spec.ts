import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashMemoAndRefillDeliveryComponent } from './cash-memo-and-refill-delivery.component';

describe('CashMemoAndRefillDeliveryComponent', () => {
  let component: CashMemoAndRefillDeliveryComponent;
  let fixture: ComponentFixture<CashMemoAndRefillDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashMemoAndRefillDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashMemoAndRefillDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
