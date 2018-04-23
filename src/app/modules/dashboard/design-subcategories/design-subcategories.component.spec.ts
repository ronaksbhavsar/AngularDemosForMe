import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSubcategoriesComponent } from './design-subcategories.component';

describe('DesignSubcategoriesComponent', () => {
  let component: DesignSubcategoriesComponent;
  let fixture: ComponentFixture<DesignSubcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSubcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
