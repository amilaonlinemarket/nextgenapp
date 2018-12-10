import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PestcontrolComponent } from './pestcontrol.component';

describe('PestcontrolComponent', () => {
  let component: PestcontrolComponent;
  let fixture: ComponentFixture<PestcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PestcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PestcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
