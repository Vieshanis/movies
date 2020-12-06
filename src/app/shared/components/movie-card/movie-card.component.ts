import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_URL } from '../../globals';
import { Movie } from '../../models/movie.model';
import { FavoriteMovieStoreService } from '../../store/favorite-movie-store.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;

  public url = IMAGE_URL;
  public isFavorite = false;

  constructor(
    private favoriteMovieStoreService: FavoriteMovieStoreService
  ) { }

  ngOnInit(): void {
    this.url = this.movie.poster_path ?
      `url(${IMAGE_URL}${this.movie.poster_path})` :
      `url('./assets/img/no-image.png')`;
    this.checkIfFavorite();
  }

  public favorite(): void {
    this.favoriteMovieStoreService.favorite(this.movie);
    this.checkIfFavorite();
  }

  private checkIfFavorite(): void {
    this.isFavorite = this.favoriteMovieStoreService.isFavorite(this.movie.id);
  }

}
