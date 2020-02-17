import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDailyStockRegisterComponent } from './customer-daily-stock-register.component';

describe('CustomerDailyStockRegisterComponent', () => {
  let component: CustomerDailyStockRegisterComponent;
  let fixture: ComponentFixture<CustomerDailyStockRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDailyStockRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDailyStockRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
