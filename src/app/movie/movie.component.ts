import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BACKDROP_URL, IMAGE_URL } from '../shared/globals';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movie$: Observable<Movie>;
  public imageUrl = BACKDROP_URL;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => this.movieService.getMovie(+params.get('id'))
        .pipe(
          map(movie => ({ ...movie, back_drop_url: this.getMovieBackdropUrl(movie) }))
        ))
    );
  }

  private getMovieBackdropUrl(movie: Movie): string {
    return movie.backdrop_path ?
      `url(${BACKDROP_URL}${movie.backdrop_path})` :
      movie.poster_path ?
        `url(${BACKDROP_URL}${movie.poster_path})` :
        null;
  }

}
