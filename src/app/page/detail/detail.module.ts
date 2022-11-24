import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SwiperModule } from "swiper/angular";

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductModule } from 'src/app/shared/components/product/product.module';
import { DetailComponent } from './detail.component';

@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    SharedModule,
    ProductModule,
    SwiperModule,
    RouterModule.forChild([
      { path: '', component: DetailComponent }
    ])
  ],
  providers: [],
})
export class DetailModule { }
