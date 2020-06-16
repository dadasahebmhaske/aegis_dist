import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOutstandingAndDueDateSummaryComponent } from './client-outstanding-and-due-date-summary.component';

describe('ClientOutstandingAndDueDateSummaryComponent', () => {
  let component: ClientOutstandingAndDueDateSummaryComponent;
  let fixture: ComponentFixture<ClientOutstandingAndDueDateSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOutstandingAndDueDateSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOutstandingAndDueDateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
