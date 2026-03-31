import { TestBed } from '@angular/core/testing';

import { FishService } from './fish.service';

describe('Fish', () => {
  let service: FishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
