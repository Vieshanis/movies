import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { FavoriteMovieStoreService } from '../shared/store/favorite-movie-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public popularMovies$: Observable<Movie[]>;
  public favoriteMovies$: Observable<Movie[]>;

  constructor(
    private homeService: HomeService,
    private favoriteMovieStoreService: FavoriteMovieStoreService
  ) { }

  ngOnInit(): void {
    this.popularMovies$ = this.homeService.getPopularMovies()
      .pipe(
        take(1),
        map(res => res.results)
      );
    this.favoriteMovies$ = this.favoriteMovieStoreService.favoriteMovies$;
  }

}
