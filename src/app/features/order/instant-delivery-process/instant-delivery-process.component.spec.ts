import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantDeliveryProcessComponent } from './instant-delivery-process.component';

describe('InstantDeliveryProcessComponent', () => {
  let component: InstantDeliveryProcessComponent;
  let fixture: ComponentFixture<InstantDeliveryProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantDeliveryProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantDeliveryProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
