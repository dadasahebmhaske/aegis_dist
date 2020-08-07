import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeAndDdPaymentStatusListComponent } from './cheque-and-dd-payment-status-list.component';

describe('ChequeAndDdPaymentStatusListComponent', () => {
  let component: ChequeAndDdPaymentStatusListComponent;
  let fixture: ComponentFixture<ChequeAndDdPaymentStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeAndDdPaymentStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeAndDdPaymentStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
