import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public popularMovies$: Observable<Movie[]>;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.popularMovies$ = this.homeService.get()
      .pipe(
        take(1),
        map(res => res.results)
      );
  }

}
