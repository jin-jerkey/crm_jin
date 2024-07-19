import { TestBed } from '@angular/core/testing';

import { GarbageServiceService } from './garbage-service.service';

describe('GarbageServiceService', () => {
  let service: GarbageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarbageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
