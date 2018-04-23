import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePicturesComponent } from './home-pictures.component';

describe('HomePicturesComponent', () => {
  let component: HomePicturesComponent;
  let fixture: ComponentFixture<HomePicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
