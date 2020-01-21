import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendDacComponent } from './resend-dac.component';

describe('ResendDacComponent', () => {
  let component: ResendDacComponent;
  let fixture: ComponentFixture<ResendDacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendDacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendDacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
