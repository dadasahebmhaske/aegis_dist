import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAndRechargeSmsComponent } from './check-and-recharge-sms.component';

describe('CheckAndRechargeSmsComponent', () => {
  let component: CheckAndRechargeSmsComponent;
  let fixture: ComponentFixture<CheckAndRechargeSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAndRechargeSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAndRechargeSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
