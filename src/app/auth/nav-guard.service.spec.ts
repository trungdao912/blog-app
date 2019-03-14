import { TestBed } from '@angular/core/testing';

import { NavGuardService } from './nav-guard.service';

describe('NavGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavGuardService = TestBed.get(NavGuardService);
    expect(service).toBeTruthy();
  });
});
