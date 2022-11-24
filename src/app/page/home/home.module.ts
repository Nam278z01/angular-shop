import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { SwiperModule } from "swiper/angular";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    SwiperModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [],
})
export class HomeModule {}
