import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Movie } from '../shared/models/movie.model';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let httpTestingController: HttpTestingController;
  let service: MovieService;

  const testData: Movie = {
    id: 100001
  } as Movie;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct API and returned Observable should match the right data', () => {
    service.getMovie(123)
      .subscribe(res => {
        expect(res).toEqual(testData);
      });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/movie/123?language=en-US`);
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });
});
