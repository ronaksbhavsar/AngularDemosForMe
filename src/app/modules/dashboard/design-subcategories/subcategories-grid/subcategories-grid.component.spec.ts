import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesGridComponent } from './subcategories-grid.component';

describe('SubcategoriesGridComponent', () => {
  let component: SubcategoriesGridComponent;
  let fixture: ComponentFixture<SubcategoriesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoriesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
