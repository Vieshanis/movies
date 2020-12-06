import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DiscoverDTO } from '../shared/models/movie.model';
import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchSpy: jasmine.Spy;

  const testData: DiscoverDTO = {
    page: 1,
    results: [],
    total_pages: 120,
    total_results: 1500
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    searchSpy = spyOn<any>(component['searchService'], 'search').and.callFake(() => of(testData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchSpy when search value changes', fakeAsync(() => {
    component.search.setValue('test');
    tick(300);

    expect(searchSpy).toHaveBeenCalledWith('test', 1);
  }));

  it('should call searchSpy when pageChange emits', fakeAsync(() => {
    component.pageChange.next(3);
    tick(200);

    expect(searchSpy).toHaveBeenCalledWith('', 3);
  }));

  it('should call searchSpy with same search value when pageChange emits', fakeAsync(() => {
    component.search.setValue('test');
    tick(300);
    component.pageChange.next(3);
    tick(200);

    expect(searchSpy).toHaveBeenCalledWith('test', 3);
  }));

  it('should call searchSpy with page 1 when search value changes', fakeAsync(() => {
    component.pageChange.next(3);
    tick(200);
    component.search.setValue('test');
    tick(300);

    expect(searchSpy).toHaveBeenCalledWith('test', 1);
  }));

});
