import { TestBed } from '@angular/core/testing';

import { NavigationalListService } from './navigational-list.service';

describe('NavigationalListService', () => {
  let service: NavigationalListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationalListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
