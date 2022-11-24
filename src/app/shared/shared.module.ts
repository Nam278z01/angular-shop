import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStatePipe } from './pipes/order-state.pipe';

@NgModule({
  declarations: [
    OrderStatePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    OrderStatePipe
  ],
  providers: [],
})
export class SharedModule { }
