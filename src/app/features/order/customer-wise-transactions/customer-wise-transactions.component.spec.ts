import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseTransactionsComponent } from './customer-wise-transactions.component';

describe('CustomerWiseTransactionsComponent', () => {
  let component: CustomerWiseTransactionsComponent;
  let fixture: ComponentFixture<CustomerWiseTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerWiseTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWiseTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
