import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminateCustomerComponent } from './terminate-customer.component';

describe('TerminateCustomerComponent', () => {
  let component: TerminateCustomerComponent;
  let fixture: ComponentFixture<TerminateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
