import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_URL } from '../../globals';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;

  public url = IMAGE_URL;
  public isFavorite = false;

  constructor() { }

  ngOnInit(): void {
    this.url = this.movie.poster_path ?
      `url(${IMAGE_URL}${this.movie.poster_path})` :
      `url('./assets/img/no-image.png')`;
  }

  public favorite(): void {
    this.isFavorite = !this.isFavorite;
  }

}
