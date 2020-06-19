import { TestBed } from '@angular/core/testing';

import { SleeptrackService } from './sleeptrack.service';

describe('SleeptrackService', () => {
  let service: SleeptrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleeptrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
