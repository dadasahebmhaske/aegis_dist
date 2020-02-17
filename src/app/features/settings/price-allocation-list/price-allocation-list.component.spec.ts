import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAllocationListComponent } from './price-allocation-list.component';

describe('PriceAllocationListComponent', () => {
  let component: PriceAllocationListComponent;
  let fixture: ComponentFixture<PriceAllocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceAllocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
