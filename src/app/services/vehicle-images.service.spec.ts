import { TestBed } from '@angular/core/testing';

import { VehicleImagesService } from './vehicle-images.service';

describe('VehicleImagesService', () => {
  let service: VehicleImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
