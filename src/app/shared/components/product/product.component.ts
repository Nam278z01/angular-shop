import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/core/entities/product';
import { environment } from 'src/environments/environment';
import { Color } from 'src/app/core/entities/color';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  host: {'class': 'w-1/4 px-[10px]'}
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  IMAGE_API: string;

  constructor() { }

  ngOnInit(): void {
    this.IMAGE_API = environment.IMAGE_API;
  }

  changeColor (product: Product, color: Color) {
    product.picked = {};
    product.picked.color = color;
  };

}
