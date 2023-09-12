import { TestBed } from '@angular/core/testing';

import { CrisesResponseService } from './crises-response.service';

describe('CrisesResponseService', () => {
  let service: CrisesResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrisesResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
