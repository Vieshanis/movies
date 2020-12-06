import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../shared/globals';
import { Movie } from '../shared/models/movie.model';

@Injectable({
  providedIn: 'any'
})
export class MovieService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMovie(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${API_URL}movie/${id}?language=en-US`);
  }
}
