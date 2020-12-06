import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MovieCardComponent,
    PaginationComponent
  ],
  exports: [
    CommonModule,
    MovieCardComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
