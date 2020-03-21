import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantDeliveredOrdersComponent } from './instant-delivered-orders.component';

describe('InstantDeliveredOrdersComponent', () => {
  let component: InstantDeliveredOrdersComponent;
  let fixture: ComponentFixture<InstantDeliveredOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantDeliveredOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantDeliveredOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
