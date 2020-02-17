import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseDiscountAllocationComponent } from './category-wise-discount-allocation.component';

describe('CategoryWiseDiscountAllocationComponent', () => {
  let component: CategoryWiseDiscountAllocationComponent;
  let fixture: ComponentFixture<CategoryWiseDiscountAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseDiscountAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseDiscountAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
