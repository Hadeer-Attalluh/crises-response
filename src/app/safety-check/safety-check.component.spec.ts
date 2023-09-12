import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyCheckComponent } from './safety-check.component';

describe('SafetyCheckComponent', () => {
  let component: SafetyCheckComponent;
  let fixture: ComponentFixture<SafetyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
