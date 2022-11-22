import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductLoadingComponent } from './product-loading/product-loading.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductLoadingComponent,
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ProductComponent,
    ProductLoadingComponent,
  ],
  providers: [],
})
export class ProductModule { }
