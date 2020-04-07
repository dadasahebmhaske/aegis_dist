import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAndDispatchDetailsComponent } from './order-and-dispatch-details.component';

describe('OrderAndDispatchDetailsComponent', () => {
  let component: OrderAndDispatchDetailsComponent;
  let fixture: ComponentFixture<OrderAndDispatchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAndDispatchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAndDispatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
