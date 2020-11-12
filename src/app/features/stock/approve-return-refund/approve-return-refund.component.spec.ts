import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReturnRefundComponent } from './approve-return-refund.component';

describe('ApproveReturnRefundComponent', () => {
  let component: ApproveReturnRefundComponent;
  let fixture: ComponentFixture<ApproveReturnRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveReturnRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveReturnRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
