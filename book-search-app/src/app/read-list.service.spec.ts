import { TestBed } from '@angular/core/testing';

import { ReadListService } from './read-list.service';

describe('ReadListService', () => {
  let service: ReadListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
