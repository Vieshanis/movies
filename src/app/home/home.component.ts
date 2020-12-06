import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { map, startWith, switchMap, take } from 'rxjs/operators';
import { Observable, pipe, Subject } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { pid } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public popularMovies$: Observable<Movie[]>;
  public pageChange = new Subject<number>();

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.popularMovies$ = this.pageChange
      .asObservable()
      .pipe(
        startWith(1),
        switchMap(page => this.homeService.getMovies(page)
          .pipe(
            take(1),
            map(res => res.results)
          ))
      )
  }

}
