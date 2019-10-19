import { TestBed } from '@angular/core/testing';

import { NgJalaliDateTimeService } from './ng-jalali-date-time.service';

describe('NgJalaliDateTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgJalaliDateTimeService = TestBed.get(NgJalaliDateTimeService);
    expect(service).toBeTruthy();
  });
});
