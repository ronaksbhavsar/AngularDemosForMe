import { TestBed, inject } from '@angular/core/testing';

import { AreainfoService } from './areainfo.service';

describe('AreainfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreainfoService]
    });
  });

  it('should be created', inject([AreainfoService], (service: AreainfoService) => {
    expect(service).toBeTruthy();
  }));
});
