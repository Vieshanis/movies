import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DiscoverDTO } from '../shared/models/movie.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public search = new FormControl('');
  public searchResults$: Observable<DiscoverDTO>;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchResults$ = this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(val => this.searchService.search(val))
      );
  }

}
