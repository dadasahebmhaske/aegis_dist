import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverRefillComponent } from './deliver-refill.component';

describe('DeliverRefillComponent', () => {
  let component: DeliverRefillComponent;
  let fixture: ComponentFixture<DeliverRefillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverRefillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverRefillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
