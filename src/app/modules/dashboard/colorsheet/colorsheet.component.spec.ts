import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsheetComponent } from './colorsheet.component';

describe('ColorsheetComponent', () => {
  let component: ColorsheetComponent;
  let fixture: ComponentFixture<ColorsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
