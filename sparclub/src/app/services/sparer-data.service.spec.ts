import { TestBed } from '@angular/core/testing';

import { SparerDataService } from './sparer-data.service';

describe('SparerDataService', () => {
  let service: SparerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
