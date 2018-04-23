import { TestBed, inject } from '@angular/core/testing';

import { SheduleService } from './shedule.service';

describe('SheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheduleService]
    });
  });

  it('should be created', inject([SheduleService], (service: SheduleService) => {
    expect(service).toBeTruthy();
  }));
});
