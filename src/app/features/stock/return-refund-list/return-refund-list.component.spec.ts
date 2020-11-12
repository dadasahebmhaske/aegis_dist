import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRefundListComponent } from './return-refund-list.component';

describe('ReturnRefundListComponent', () => {
  let component: ReturnRefundListComponent;
  let fixture: ComponentFixture<ReturnRefundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnRefundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRefundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
