import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfSdPriceAllocationListComponent } from './sf-sd-price-allocation-list.component';

describe('SfSdPriceAllocationListComponent', () => {
  let component: SfSdPriceAllocationListComponent;
  let fixture: ComponentFixture<SfSdPriceAllocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfSdPriceAllocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfSdPriceAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
