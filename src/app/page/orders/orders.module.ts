import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { OrdersComponent } from './orders.component';


@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OrdersComponent }
    ])
  ],
  providers: [],
})
export class OrdersModule {}
