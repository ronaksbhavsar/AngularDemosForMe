import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHouseDetailsComponent } from './my-house-details.component';

describe('MyHouseDetailsComponent', () => {
  let component: MyHouseDetailsComponent;
  let fixture: ComponentFixture<MyHouseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHouseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
