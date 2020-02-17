import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAllocationComponent } from './price-allocation.component';

describe('PriceAllocationComponent', () => {
  let component: PriceAllocationComponent;
  let fixture: ComponentFixture<PriceAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
