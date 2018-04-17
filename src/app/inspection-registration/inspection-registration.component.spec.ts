import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionRegistrationComponent } from './inspection-registration.component';

describe('InspectionRegistrationComponent', () => {
  let component: InspectionRegistrationComponent;
  let fixture: ComponentFixture<InspectionRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
