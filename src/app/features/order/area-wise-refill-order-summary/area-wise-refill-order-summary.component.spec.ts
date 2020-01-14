import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaWiseRefillOrderSummaryComponent } from './area-wise-refill-order-summary.component';

describe('AreaWiseRefillOrderSummaryComponent', () => {
  let component: AreaWiseRefillOrderSummaryComponent;
  let fixture: ComponentFixture<AreaWiseRefillOrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaWiseRefillOrderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaWiseRefillOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
