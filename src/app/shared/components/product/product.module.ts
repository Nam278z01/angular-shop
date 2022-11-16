import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ProductComponent
  ],
  providers: [],
})
export class ProductModule { }
