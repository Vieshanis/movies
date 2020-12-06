import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieStoreService {

  private favoriteMovies = new BehaviorSubject<Movie[]>([]);
  public readonly favoriteMovies$ = this.favoriteMovies.asObservable();

  constructor() { }

  public favorite(movie: Movie): void {
    const array = this.favoriteMovies.getValue();
    const index = array.findIndex(item => item.id === movie.id);
    index === -1 ? array.push(movie) : array.splice(index, 1);
    this.favoriteMovies.next(array);
  }

  public isFavorite(id: number): boolean {
    const array = this.favoriteMovies.getValue();
    const index = array.findIndex(item => item.id === id);
    return index > -1;
  }
}
