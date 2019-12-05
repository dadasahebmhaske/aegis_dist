import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportMasterComponent } from './transport-master.component';

describe('TransportMasterComponent', () => {
  let component: TransportMasterComponent;
  let fixture: ComponentFixture<TransportMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
