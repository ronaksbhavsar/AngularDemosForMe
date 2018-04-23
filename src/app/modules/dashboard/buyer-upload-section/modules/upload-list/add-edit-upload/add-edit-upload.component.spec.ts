import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUploadComponent } from './add-edit-upload.component';

describe('AddEditUploadComponent', () => {
  let component: AddEditUploadComponent;
  let fixture: ComponentFixture<AddEditUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
