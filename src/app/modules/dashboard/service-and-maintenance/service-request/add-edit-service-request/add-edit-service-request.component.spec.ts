import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditServiceRequestComponent } from './add-edit-service-request.component';


describe('AddServiceRequestComponent', () => {
  let component: AddEditServiceRequestComponent;
  let fixture: ComponentFixture<AddEditServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditServiceRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
