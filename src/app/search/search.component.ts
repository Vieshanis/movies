import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  merge,
  Observable,
  of,
  Subject
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  take
} from 'rxjs/operators';
import { DiscoverDTO } from '../shared/models/movie.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  public search = new FormControl('');
  public searchResults$: Observable<DiscoverDTO>;
  public pageChange = new Subject<number>();

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    const search$ = this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(value => ({ search: value, page: 1 }))
      );

    const page$ = this.pageChange
      .asObservable()
      .pipe(
        debounceTime(200),
        map(page => ({ search: this.search.value, page }))
      );

    this.searchResults$ = merge(
      search$,
      page$
    )
      .pipe(
        switchMap(val => this.searchService.search(val.search, val.page)
          .pipe(
            take(1),
            catchError(() => of(null))
          )
        )
      );

  }

}
