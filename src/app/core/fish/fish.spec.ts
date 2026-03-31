import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fish } from './fish';

describe('Fish', () => {
  let component: Fish;
  let fixture: ComponentFixture<Fish>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fish],
    }).compileComponents();

    fixture = TestBed.createComponent(Fish);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
