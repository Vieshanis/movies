import { TestBed } from '@angular/core/testing';

import { FavoriteMovieStoreService } from './favorite-movie-store.service';

describe('FavoriteMovieStoreService', () => {
  let service: FavoriteMovieStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteMovieStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
