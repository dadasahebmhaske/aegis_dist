import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfSdPriceAllocationComponent } from './sf-sd-price-allocation.component';

describe('SfSdPriceAllocationComponent', () => {
  let component: SfSdPriceAllocationComponent;
  let fixture: ComponentFixture<SfSdPriceAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfSdPriceAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfSdPriceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
