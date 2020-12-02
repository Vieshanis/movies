import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) }, { path: 'movie', loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule) }, { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
