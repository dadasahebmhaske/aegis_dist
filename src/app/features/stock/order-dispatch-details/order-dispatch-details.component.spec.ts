import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDispatchDetailsComponent } from './order-dispatch-details.component';

describe('OrderDispatchDetailsComponent', () => {
  let component: OrderDispatchDetailsComponent;
  let fixture: ComponentFixture<OrderDispatchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDispatchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDispatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
