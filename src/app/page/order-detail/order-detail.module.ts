import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { OrderDetailComponent } from './order-detail.component';


@NgModule({
  declarations: [
    OrderDetailComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OrderDetailComponent }
    ])
  ],
  providers: [],
})
export class OrderDetailModule {}
