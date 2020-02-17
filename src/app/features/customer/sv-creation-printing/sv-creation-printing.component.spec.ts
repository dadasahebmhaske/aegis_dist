import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvCreationPrintingComponent } from './sv-creation-printing.component';

describe('SvCreationPrintingComponent', () => {
  let component: SvCreationPrintingComponent;
  let fixture: ComponentFixture<SvCreationPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvCreationPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvCreationPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
