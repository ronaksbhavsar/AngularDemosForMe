import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhouseGridComponent } from './myhouse-grid.component';

describe('MyhouseGridComponent', () => {
  let component: MyhouseGridComponent;
  let fixture: ComponentFixture<MyhouseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhouseGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhouseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
