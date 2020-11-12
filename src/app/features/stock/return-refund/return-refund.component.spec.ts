import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRefundComponent } from './return-refund.component';

describe('ReturnRefundComponent', () => {
  let component: ReturnRefundComponent;
  let fixture: ComponentFixture<ReturnRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
