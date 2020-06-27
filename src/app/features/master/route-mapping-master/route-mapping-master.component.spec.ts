import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMappingMasterComponent } from './route-mapping-master.component';

describe('RouteMappingMasterComponent', () => {
  let component: RouteMappingMasterComponent;
  let fixture: ComponentFixture<RouteMappingMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMappingMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMappingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
