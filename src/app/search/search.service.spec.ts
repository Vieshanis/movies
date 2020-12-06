import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DiscoverDTO } from '../shared/models/movie.model';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let httpTestingController: HttpTestingController;
  let service: SearchService;

  const testData: DiscoverDTO = {
    page: 1,
    results: [],
    total_pages: 120,
    total_results: 1500
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct API and returned Observable should match the right data', () => {
    service.search('test', 145)
      .subscribe(res => {
        expect(res).toEqual(testData);
      });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/search/movie?language=en-US&query=test&page=145`);
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });
});
