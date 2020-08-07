import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferToPettyCashAndBankAccountComponent } from './transfer-to-petty-cash-and-bank-account.component';

describe('TransferToPettyCashAndBankAccountComponent', () => {
  let component: TransferToPettyCashAndBankAccountComponent;
  let fixture: ComponentFixture<TransferToPettyCashAndBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferToPettyCashAndBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferToPettyCashAndBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
