import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseDiscountAllocationListComponent } from './category-wise-discount-allocation-list.component';

describe('CategoryWiseDiscountAllocationListComponent', () => {
  let component: CategoryWiseDiscountAllocationListComponent;
  let fixture: ComponentFixture<CategoryWiseDiscountAllocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseDiscountAllocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseDiscountAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
