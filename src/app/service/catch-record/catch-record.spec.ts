import { TestBed } from '@angular/core/testing';

import { CatchRecordService } from './catch-record.service';

describe('CatchRecord', () => {
  let service: CatchRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatchRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
