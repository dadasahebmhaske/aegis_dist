import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStockRegisterComponent } from './daily-stock-register.component';

describe('DailyStockRegisterComponent', () => {
  let component: DailyStockRegisterComponent;
  let fixture: ComponentFixture<DailyStockRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStockRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyStockRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
