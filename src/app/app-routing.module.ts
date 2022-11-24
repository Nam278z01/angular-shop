import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router\

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule) },
  { path: 'search', loadChildren: () => import('./page/search/search.module').then(m => m.SearchModule) },
  { path: 'detail', loadChildren: () => import('./page/detail/detail.module').then(m => m.DetailModule) },
  { path: 'cart', loadChildren: () => import('./page/cart/cart.module').then(m => m.CartModule) },
  { path: 'orders', loadChildren: () => import('./page/orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
  { path: 'order-detail', loadChildren: () => import('./page/order-detail/order-detail.module').then(m => m.OrderDetailModule), canActivate: [AuthGuard] },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
