import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnStockListComponent } from './return-stock-list.component';

describe('ReturnStockListComponent', () => {
  let component: ReturnStockListComponent;
  let fixture: ComponentFixture<ReturnStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
