import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CartComponent }
    ])
  ],
  providers: [],
})
export class CartModule { }
