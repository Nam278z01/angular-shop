import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductModule } from 'src/app/shared/components/product/product.module';
import { SearchComponent } from './search.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    SearchComponent,
    SidebarComponent,
  ],
  imports: [
    SharedModule,
    ProductModule,
    NgxPaginationModule,
    RouterModule.forChild([
      { path: '', component: SearchComponent }
    ])
  ],
  providers: [],
})
export class SearchModule { }
