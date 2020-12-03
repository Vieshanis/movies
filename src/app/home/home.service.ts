import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../shared/globals';
import { DiscoverDTO } from '../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public get(): Observable<DiscoverDTO> {
    return this.httpClient.get<DiscoverDTO>(`${API_URL}discover/movie?language=en-US&
    sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
  }
}
