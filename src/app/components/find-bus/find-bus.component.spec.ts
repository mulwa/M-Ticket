import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBusComponent } from './find-bus.component';

describe('FindBusComponent', () => {
  let component: FindBusComponent;
  let fixture: ComponentFixture<FindBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
