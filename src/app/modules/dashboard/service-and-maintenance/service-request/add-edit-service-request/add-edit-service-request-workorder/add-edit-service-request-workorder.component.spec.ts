import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServiceRequestWorkorderComponent } from './add-edit-service-request-workorder.component';

describe('AddEditServiceRequestWorkorderComponent', () => {
  let component: AddEditServiceRequestWorkorderComponent;
  let fixture: ComponentFixture<AddEditServiceRequestWorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditServiceRequestWorkorderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditServiceRequestWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
