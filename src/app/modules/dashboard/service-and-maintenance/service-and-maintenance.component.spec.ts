import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAndMaintenanceComponent } from './service-and-maintenance.component';

describe('ServiceAndMaintenanceComponent', () => {
  let component: ServiceAndMaintenanceComponent;
  let fixture: ComponentFixture<ServiceAndMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAndMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAndMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
