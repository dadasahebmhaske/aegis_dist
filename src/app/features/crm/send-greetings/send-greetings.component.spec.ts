import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendGreetingsComponent } from './send-greetings.component';

describe('SendGreetingsComponent', () => {
  let component: SendGreetingsComponent;
  let fixture: ComponentFixture<SendGreetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendGreetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
