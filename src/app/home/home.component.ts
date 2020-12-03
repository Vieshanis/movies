import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.get()
      .pipe(take(1))
      .subscribe(res => console.log(res))
  }

}
