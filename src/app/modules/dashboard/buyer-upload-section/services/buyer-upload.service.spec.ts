import { TestBed, inject } from '@angular/core/testing';
import { BuyerUploadService } from './buyer-upload.service';


describe('BuyerUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyerUploadService]
    });
  });

  it('should be created', inject([BuyerUploadService], (service: BuyerUploadService) => {
    expect(service).toBeTruthy();
  }));
});
