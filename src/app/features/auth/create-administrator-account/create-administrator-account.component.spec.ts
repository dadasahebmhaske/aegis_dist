import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdministratorAccountComponent } from './create-administrator-account.component';

describe('CreateAdministratorAccountComponent', () => {
  let component: CreateAdministratorAccountComponent;
  let fixture: ComponentFixture<CreateAdministratorAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdministratorAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdministratorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
