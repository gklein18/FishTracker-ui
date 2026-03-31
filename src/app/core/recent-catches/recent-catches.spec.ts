import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCatches } from './recent-catches';

describe('RecentCatches', () => {
  let component: RecentCatches;
  let fixture: ComponentFixture<RecentCatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentCatches],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentCatches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
