import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ]),
  ],
  providers: [],
})
export class HomeModule {}
