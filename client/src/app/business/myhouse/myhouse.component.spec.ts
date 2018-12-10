import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhouseComponent } from './myhouse.component';

describe('MyhouseComponent', () => {
  let component: MyhouseComponent;
  let fixture: ComponentFixture<MyhouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
