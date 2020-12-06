import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DiscoverDTO } from '../shared/models/movie.model';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let getPopularMoviesSpy: jasmine.Spy;

  const testData: DiscoverDTO = {
    page: 1,
    results: [],
    total_pages: 120,
    total_results: 1500
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        SharedModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    getPopularMoviesSpy = spyOn<any>(component['homeService'], 'getPopularMovies').and.callFake(() => of(testData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call homeService.getPopularMoviesSpy after ngOnInit', () => {
    expect(getPopularMoviesSpy).toHaveBeenCalled();
  });
});
