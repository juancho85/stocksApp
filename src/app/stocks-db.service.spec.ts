/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StocksDbService } from './stocks-db.service';

describe('StocksDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksDbService]
    });
  });

  it('should ...', inject([StocksDbService], (service: StocksDbService) => {
    expect(service).toBeTruthy();
  }));
});
