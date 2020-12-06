import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DiscoverDTO } from '../shared/models/movie.model';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let httpTestingController: HttpTestingController;
  let service: HomeService;

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
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct API and returned Observable should match the right data', () => {
    service.getPopularMovies()
      .subscribe(res => {
        expect(res).toEqual(testData);
      });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/discover/movie?language=en-US&
    sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });
});
