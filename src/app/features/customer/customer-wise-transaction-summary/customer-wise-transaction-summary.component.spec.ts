import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseTransactionSummaryComponent } from './customer-wise-transaction-summary.component';

describe('CustomerWiseTransactionSummaryComponent', () => {
  let component: CustomerWiseTransactionSummaryComponent;
  let fixture: ComponentFixture<CustomerWiseTransactionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerWiseTransactionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWiseTransactionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
