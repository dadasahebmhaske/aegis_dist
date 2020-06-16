import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseTransactionDetailsComponent } from './customer-wise-transaction-details.component';

describe('CustomerWiseTransactionDetailsComponent', () => {
  let component: CustomerWiseTransactionDetailsComponent;
  let fixture: ComponentFixture<CustomerWiseTransactionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerWiseTransactionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWiseTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
