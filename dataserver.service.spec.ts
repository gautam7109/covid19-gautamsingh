import { TestBed } from '@angular/core/testing';

import { DataserverService } from './dataserver.service';

describe('DataserverService', () => {
  let service: DataserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
