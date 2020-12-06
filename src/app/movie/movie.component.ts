import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { BACKDROP_URL } from '../shared/globals';
import { Movie } from '../shared/models/movie.model';
import { FavoriteMovieStoreService } from '../shared/store/favorite-movie-store.service';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movie$: Observable<Movie>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteMovieStoreService: FavoriteMovieStoreService
  ) { }

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => this.movieService.getMovie(+params.get('id'))
        .pipe(
          take(1),
          map(movie => ({
            ...movie,
            back_drop_url: this.getMovieBackdropUrl(movie),
            is_favorite: this.favoriteMovieStoreService.isFavorite(movie.id)
          }))
        ))
    );
  }

  public favorite(movie: Movie): void {
    this.favoriteMovieStoreService.favorite(movie);
    movie.is_favorite = this.favoriteMovieStoreService.isFavorite(movie.id);
  }

  private getMovieBackdropUrl(movie: Movie): string {
    return movie.backdrop_path ?
      `url(${BACKDROP_URL}${movie.backdrop_path})` :
      movie.poster_path ?
        `url(${BACKDROP_URL}${movie.poster_path})` :
        null;
  }

}
