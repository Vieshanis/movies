import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { SharedModule } from '../shared/shared.module';

import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let getMovieSpy: jasmine.Spy;
  let favoriteSpy: jasmine.Spy;

  const testData = {
    id: 1103
  } as Movie;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CommonModule,
        SharedModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;

    getMovieSpy = spyOn<any>(component['movieService'], 'getMovie').and.callFake(() => of(testData));
    favoriteSpy = spyOn<any>(component['favoriteMovieStoreService'], 'favorite');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call movieService.getMovieSpy after ngOnInit', () => {
    expect(getMovieSpy).toHaveBeenCalledOnceWith(0);
  });

  it('should call getMovieBackdropUrlSpy after movieService.getMovie emits value', done => {
    const getMovieBackdropUrlSpy = spyOn<any>(component, 'getMovieBackdropUrl');
    component.movie$.subscribe(() => {
      expect(getMovieBackdropUrlSpy).toHaveBeenCalledOnceWith(testData);
      done();
    });
  });

  it('should call isFavoriteSpy after movieService.getMovie emits value', done => {
    spyOn(component['favoriteMovieStoreService'], 'isFavorite');
    component.movie$.subscribe(() => {
      expect(component['favoriteMovieStoreService'].isFavorite).toHaveBeenCalledOnceWith(1103);
      done();
    });
  });

  it('should call favoriteSpy after favorite() was called', () => {
    component.favorite(testData);

    expect(favoriteSpy).toHaveBeenCalledOnceWith(testData);
  });

  it('should call isFavoriteSpy after favorite() was called', () => {
    spyOn(component['favoriteMovieStoreService'], 'isFavorite');
    component.favorite(testData);

    expect(component['favoriteMovieStoreService'].isFavorite).toHaveBeenCalledOnceWith(1103);
  });

});
