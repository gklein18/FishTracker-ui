import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBests } from './personal-bests';

describe('PersonalBests', () => {
  let component: PersonalBests;
  let fixture: ComponentFixture<PersonalBests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalBests],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalBests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
