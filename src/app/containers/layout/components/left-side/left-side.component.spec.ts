import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftSideComponent } from './left-side.component';



describe('AdminLeftSideComponent', () => {
  let component: LeftSideComponent;
  let fixture: ComponentFixture<LeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
