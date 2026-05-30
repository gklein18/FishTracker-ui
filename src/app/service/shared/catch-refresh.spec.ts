import { TestBed } from '@angular/core/testing';

import { CatchRefreshService } from './catch-refresh.service';

describe('CatchRefreshService', () => {
  let service: CatchRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatchRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
