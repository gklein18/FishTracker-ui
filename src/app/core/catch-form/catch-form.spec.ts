import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchForm } from './catch-form';

describe('CatchForm', () => {
  let component: CatchForm;
  let fixture: ComponentFixture<CatchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CatchForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
