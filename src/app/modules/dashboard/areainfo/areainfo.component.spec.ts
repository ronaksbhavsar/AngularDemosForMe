import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreainfoComponent } from './areainfo.component';

describe('AreainfoComponent', () => {
  let component: AreainfoComponent;
  let fixture: ComponentFixture<AreainfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreainfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreainfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
