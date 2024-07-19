import { TestBed } from '@angular/core/testing';

import { BlockHomeGuard } from './block-home.guard';

describe('BlockHomeGuard', () => {
  let guard: BlockHomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlockHomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
