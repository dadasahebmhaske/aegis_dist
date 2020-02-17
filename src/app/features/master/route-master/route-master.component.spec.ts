import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMasterComponent } from './route-master.component';

describe('RouteMasterComponent', () => {
  let component: RouteMasterComponent;
  let fixture: ComponentFixture<RouteMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
