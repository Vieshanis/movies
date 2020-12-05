import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MovieCardComponent
  ],
  exports: [
    CommonModule,
    MovieCardComponent
  ]
})
export class SharedModule { }