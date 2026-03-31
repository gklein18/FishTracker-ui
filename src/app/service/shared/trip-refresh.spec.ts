import { TestBed } from '@angular/core/testing';

import { TripRefreshService } from './trip-refresh.service';

describe('TripRefresh', () => {
  let service: TripRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
