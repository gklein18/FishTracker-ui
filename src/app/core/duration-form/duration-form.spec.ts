import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationForm } from './duration-form';

describe('DurationForm', () => {
  let component: DurationForm;
  let fixture: ComponentFixture<DurationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DurationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DurationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
