/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Property.service.tsService } from './property.service';

describe('Service: Property.service.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Property.service.tsService]
    });
  });

  it('should ...', inject([Property.service.tsService], (service: Property.service.tsService) => {
    expect(service).toBeTruthy();
  }));
});
