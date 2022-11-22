import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router\

import { HomeComponent } from './page/home/home.component';
import { DetailComponent } from './page/detail/detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', loadChildren: () => import('./page/search/search.module').then(m => m.SearchModule) },
  { path: 'detail', component: DetailComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
