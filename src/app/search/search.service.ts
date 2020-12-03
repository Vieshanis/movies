import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'any'
})
export class SearchService {

  constructor(
    private httpClient: HttpClient
  ) { }

  
}
