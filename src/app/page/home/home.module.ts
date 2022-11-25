import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SwiperModule } from "swiper/angular";


import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from "./home.component";
import { ProductModule } from './../../shared/components/product/product.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    SwiperModule,
    ProductModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ]),
  ],
  providers: [],
})
export class HomeModule {}
