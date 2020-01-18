import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowRegisterComponent } from './cash-flow-register.component';

describe('CashFlowRegisterComponent', () => {
  let component: CashFlowRegisterComponent;
  let fixture: ComponentFixture<CashFlowRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashFlowRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
