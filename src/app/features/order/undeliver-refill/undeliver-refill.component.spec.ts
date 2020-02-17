import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeliverRefillComponent } from './undeliver-refill.component';

describe('UndeliverRefillComponent', () => {
  let component: UndeliverRefillComponent;
  let fixture: ComponentFixture<UndeliverRefillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeliverRefillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeliverRefillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
