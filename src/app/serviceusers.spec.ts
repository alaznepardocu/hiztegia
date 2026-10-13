import { TestBed } from '@angular/core/testing';
import { Serviceusers } from './serviceusers';

describe('Serviceusers', () => {
  let service: Serviceusers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serviceusers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
