import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorAuthentificationComponent } from './distributor-authentification.component';

describe('DistributorAuthentificationComponent', () => {
  let component: DistributorAuthentificationComponent;
  let fixture: ComponentFixture<DistributorAuthentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorAuthentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorAuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
