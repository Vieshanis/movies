import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../shared/globals';
import { DiscoverDTO } from '../shared/models/movie.model';

@Injectable({
  providedIn: 'any'
})
export class SearchService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public search(query: string, page: number): Observable<DiscoverDTO> {
    return this.httpClient.get<DiscoverDTO>(`${API_URL}search/movie?language=en-US&query=${query}&page=${page}`);
  }

}
