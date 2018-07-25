import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowerRegistrationsComponent } from './registrations.component';

describe('GrowerRegistrationsComponent', () => {
  let component: GrowerRegistrationsComponent;
  let fixture: ComponentFixture<GrowerRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowerRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowerRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
