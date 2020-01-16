import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCustomerInComponent } from './transfer-customer-in.component';

describe('TransferCustomerInComponent', () => {
  let component: TransferCustomerInComponent;
  let fixture: ComponentFixture<TransferCustomerInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferCustomerInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferCustomerInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
