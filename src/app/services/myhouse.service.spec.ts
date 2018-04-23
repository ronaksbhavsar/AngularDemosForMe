import { TestBed, inject } from '@angular/core/testing';

import { MyhouseService } from './myhouse.service';

describe('MyhouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyhouseService]
    });
  });

  it('should be created', inject([MyhouseService], (service: MyhouseService) => {
    expect(service).toBeTruthy();
  }));
});
