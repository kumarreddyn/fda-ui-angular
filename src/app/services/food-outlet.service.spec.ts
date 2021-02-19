import { TestBed } from '@angular/core/testing';

import { FoodOutletService } from './food-outlet.service';

describe('FoodOutletService', () => {
  let service: FoodOutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodOutletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
