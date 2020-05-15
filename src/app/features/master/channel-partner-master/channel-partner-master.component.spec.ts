import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPartnerMasterComponent } from './channel-partner-master.component';

describe('ChannelPartnerMasterComponent', () => {
  let component: ChannelPartnerMasterComponent;
  let fixture: ComponentFixture<ChannelPartnerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPartnerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPartnerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
