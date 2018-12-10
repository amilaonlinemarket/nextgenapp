import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyeduComponent } from './myedu.component';

describe('MyeduComponent', () => {
  let component: MyeduComponent;
  let fixture: ComponentFixture<MyeduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyeduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyeduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
