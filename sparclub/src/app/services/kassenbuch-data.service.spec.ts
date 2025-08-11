import { TestBed } from '@angular/core/testing';

import { KassenbuchDataService } from './kassenbuch-data.service';

describe('KassenbuchDataService', () => {
  let service: KassenbuchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KassenbuchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
