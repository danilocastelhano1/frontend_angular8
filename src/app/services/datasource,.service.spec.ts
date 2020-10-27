import { TestBed } from '@angular/core/testing';

import { DataSourceService } from './datasource.service';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSourceService = TestBed.get(DataSourceService);
    expect(service).toBeTruthy();
  });
});
