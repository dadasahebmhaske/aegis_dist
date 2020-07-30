import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWiseOrderReportComponent } from './product-wise-order-report.component';

describe('ProductWiseOrderReportComponent', () => {
  let component: ProductWiseOrderReportComponent;
  let fixture: ComponentFixture<ProductWiseOrderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWiseOrderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWiseOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
