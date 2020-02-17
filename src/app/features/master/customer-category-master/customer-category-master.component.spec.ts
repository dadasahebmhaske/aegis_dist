import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCategoryMasterComponent } from './customer-category-master.component';

describe('CustomerCategoryMasterComponent', () => {
  let component: CustomerCategoryMasterComponent;
  let fixture: ComponentFixture<CustomerCategoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCategoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
