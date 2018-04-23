import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceChecklistComponent } from './maintenance-checklist.component';

describe('MaintenanceChecklistComponent', () => {
  let component: MaintenanceChecklistComponent;
  let fixture: ComponentFixture<MaintenanceChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
