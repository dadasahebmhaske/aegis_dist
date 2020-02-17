import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImbalanceComponent } from './add-imbalance.component';

describe('AddImbalanceComponent', () => {
  let component: AddImbalanceComponent;
  let fixture: ComponentFixture<AddImbalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImbalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
