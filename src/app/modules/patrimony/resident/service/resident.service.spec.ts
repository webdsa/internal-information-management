/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResidentService } from './resident.service';

describe('Service: Resident', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidentService]
    });
  });

  it('should ...', inject([ResidentService], (service: ResidentService) => {
    expect(service).toBeTruthy();
  }));
});
