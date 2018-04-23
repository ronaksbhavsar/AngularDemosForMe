import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAppointmentsComponent } from './appointments.component';


describe('AppointmentsComponent', () => {
  let component: DashboardAppointmentsComponent;
  let fixture: ComponentFixture<DashboardAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
