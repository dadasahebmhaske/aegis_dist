import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseProductDetailsComponent } from './customer-wise-product-details.component';

describe('CustomerWiseProductDetailsComponent', () => {
  let component: CustomerWiseProductDetailsComponent;
  let fixture: ComponentFixture<CustomerWiseProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerWiseProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWiseProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
