import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router\

import { HomeComponent } from './page/home/home.component';
import { OrderDetailComponent } from './page/order-detail/order-detail.component';
import { OrderComponent } from './page/order/order.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', loadChildren: () => import('./page/search/search.module').then(m => m.SearchModule) },
  { path: 'detail', loadChildren: () => import('./page/detail/detail.module').then(m => m.DetailModule) },
  { path: 'cart', loadChildren: () => import('./page/cart/cart.module').then(m => m.CartModule) },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'order-detail', component: OrderDetailComponent, canActivate: [AuthGuard] },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
