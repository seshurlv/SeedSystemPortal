import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorAssignmentsComponent } from './assignments.component';

describe('InspectorAssignmentsComponent', () => {
  let component: InspectorAssignmentsComponent;
  let fixture: ComponentFixture<InspectorAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
