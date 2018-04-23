import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PossessionComponent } from './possession.component';

describe('PossessionComponent', () => {
  let component: PossessionComponent;
  let fixture: ComponentFixture<PossessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PossessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PossessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
