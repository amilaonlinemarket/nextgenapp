import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdDropdownBasicComponent } from './ngbd-dropdown-basic.component';

describe('NgbdDropdownBasicComponent', () => {
  let component: NgbdDropdownBasicComponent;
  let fixture: ComponentFixture<NgbdDropdownBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdDropdownBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdDropdownBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
