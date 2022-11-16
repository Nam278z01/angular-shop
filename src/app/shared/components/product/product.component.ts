import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from 'src/app/core/services/api.service';
import { Product } from 'src/app/core/entities/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {

  }

}
