import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareColorsheetsComponent } from './compare-colorsheets.component';

describe('CompareColorsheetsComponent', () => {
  let component: CompareColorsheetsComponent;
  let fixture: ComponentFixture<CompareColorsheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareColorsheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareColorsheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
