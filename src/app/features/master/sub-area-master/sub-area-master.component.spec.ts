import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAreaMasterComponent } from './sub-area-master.component';

describe('SubAreaMasterComponent', () => {
  let component: SubAreaMasterComponent;
  let fixture: ComponentFixture<SubAreaMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAreaMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAreaMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
