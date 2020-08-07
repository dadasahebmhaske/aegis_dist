import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeAndDdPaymentStatusComponent } from './cheque-and-dd-payment-status.component';

describe('ChequeAndDdPaymentStatusComponent', () => {
  let component: ChequeAndDdPaymentStatusComponent;
  let fixture: ComponentFixture<ChequeAndDdPaymentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeAndDdPaymentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeAndDdPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
