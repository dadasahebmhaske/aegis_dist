import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMappingComponent } from './route-mapping.component';

describe('RouteMappingComponent', () => {
  let component: RouteMappingComponent;
  let fixture: ComponentFixture<RouteMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
