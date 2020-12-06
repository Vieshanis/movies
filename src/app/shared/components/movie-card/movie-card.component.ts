import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMAGE_URL } from '../../globals';
import { Movie } from '../../models/movie.model';
import { FavoriteMovieStoreService } from '../../store/favorite-movie-store.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnDestroy {

  @Input() movie: Movie;

  public url = IMAGE_URL;
  public isFavorite = false;

  private subscription = new Subscription();

  constructor(
    private favoriteMovieStoreService: FavoriteMovieStoreService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.url = this.movie.poster_path ?
      `url(${IMAGE_URL}${this.movie.poster_path})` :
      `url('./assets/img/no-image.png')`;

    this.subscription.add(
      this.favoriteMovieStoreService.favoriteMovies$
        .subscribe(() => this.checkIfFavorite())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public favorite(): void {
    this.favoriteMovieStoreService.favorite(this.movie);
  }

  private checkIfFavorite(): void {
    this.isFavorite = this.favoriteMovieStoreService.isFavorite(this.movie.id);
    this.changeDetectorRef.detectChanges();
  }

}
