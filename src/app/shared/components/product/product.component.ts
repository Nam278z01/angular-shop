import { Component, Input, OnInit, Injector } from '@angular/core';

import { Product } from 'src/app/core/entities/product';
import { Color } from 'src/app/core/entities/color';
import { Utils } from './../../../core/common/utils';
import { Size } from 'src/app/core/entities/size';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  extends Utils implements OnInit {

  @Input() product: Product;

  constructor(injector: Injector) {
    super(injector);
  }//

  ngOnInit(): void {
  }

  changeColor (product: Product, color: Color) {
    product.picked = {};
    product.picked.color = color;
  };
}
