import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootHeaderComponent } from './root-header.component';

describe('RootHeaderComponent', () => {
  let component: RootHeaderComponent;
  let fixture: ComponentFixture<RootHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
