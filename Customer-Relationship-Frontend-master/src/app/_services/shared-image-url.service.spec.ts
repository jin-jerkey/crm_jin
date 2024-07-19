import { TestBed } from '@angular/core/testing';

import { SharedImageUrlService } from './shared-image-url.service';

describe('SharedImageUrlService', () => {
  let service: SharedImageUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedImageUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
