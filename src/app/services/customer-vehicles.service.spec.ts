import { TestBed } from '@angular/core/testing';

import { CustomerVehiclesService } from './customer-vehicles.service';

describe('CustomerVehiclesService', () => {
  let service: CustomerVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
