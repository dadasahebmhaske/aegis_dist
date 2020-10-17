import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfSdBulkPriceAllocationComponent } from './sf-sd-bulk-price-allocation.component';

describe('SfSdBulkPriceAllocationComponent', () => {
  let component: SfSdBulkPriceAllocationComponent;
  let fixture: ComponentFixture<SfSdBulkPriceAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfSdBulkPriceAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfSdBulkPriceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
