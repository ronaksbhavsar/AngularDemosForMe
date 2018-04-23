import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhouseListComponent } from './myhouse-list.component';

describe('MyhouseListComponent', () => {
  let component: MyhouseListComponent;
  let fixture: ComponentFixture<MyhouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhouseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
