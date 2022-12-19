import { TestBed } from '@angular/core/testing';

import { RelacionService } from './relacion.service';

describe('RelacionService', () => {
  let service: RelacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
